import { ROLES } from '@constants/roles'
import { DepartmentsService } from '@departments/departments.service'
import { LdapService } from '@ldap/ldap.service'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersInfoService } from '@users-info/users-info.service'
import { CreateUserAdminInput } from '@users/dto/create-user-admin.input'
import { CreateUserInput } from '@users/dto/create-user.input'
import { GetUserInput } from '@users/dto/get-user.input'
import { UpdateUserInput } from '@users/dto/update-user.input'
import { UserModel } from '@users/entities/user.entity'
import { compare, hash } from 'bcrypt'
import { readdirSync, unlinkSync } from 'fs'
import { FindOptionsWhere, Repository } from 'typeorm'

export type UserOptions = {
  withDeleted?: boolean
  loadRelations?: boolean
}

@Injectable()
export class UsersService {
  private admin: UserModel

  constructor(
    @InjectRepository(UserModel) private readonly repo: Repository<UserModel>,
    @Inject(LdapService) private readonly ldapService: LdapService,
    @Inject(forwardRef(() => UsersInfoService)) private readonly usersInfoService: UsersInfoService,
    @Inject(DepartmentsService) private readonly departmentsService: DepartmentsService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    this.repo
      .findOneBy({ role: ROLES.ADMIN })
      .then((admin) => (this.admin = admin))
      .catch(() => (this.admin = null))
  }

  async validate(identifier: string, password: string): Promise<UserModel> {
    const user = await this.repo.findOne({
      where: [{ username: identifier }, { email: identifier }],
      relations: ['manager']
    })

    if (!user) {
      throw new BadRequestException('Username/email or password incorrect')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new BadRequestException('Username/email or password incorrect')
    }

    return user
  }

  async create({ email, username, role }: CreateUserInput): Promise<UserModel> {
    const userFound = await this.repo.findOneBy({ email, username })

    if (userFound) {
      if (!userFound?.deletedAt) {
        throw new ConflictException('Entered username or email already exists')
      }

      this.repo.merge(userFound, { blocked: false, deletedAt: null })
      return await this.repo.save(userFound)
    }

    const defaultPassword = this.configService.get<string>('DEFAULT_PASSWORD')
    const salt = +this.configService.get<number>('SALT_GEN', { infer: true })
    const password = await hash(defaultPassword, salt)

    const user = await this.repo.save(this.repo.create({ email, username, role, password }))
    const ldapInfo = await this.ldapService.getByUsername(user.username)
    const info = await this.usersInfoService.create(user, ldapInfo)

    this.repo.merge(user, { info })
    return await this.repo.save(user)
  }

  async createAdmin({ username, email, password }: CreateUserAdminInput): Promise<UserModel> {
    if (!this.admin) {
      const salt = +this.configService.get<number>('SALT_GEN', { infer: true })
      const hashedPassword = await hash(password, salt)
      const user = this.repo.create({
        username,
        email,
        password: hashedPassword,
        role: ROLES.ADMIN
      })

      return await this.repo.save(user)
    }

    return this.admin
  }

  async get({ id, username }: GetUserInput, options?: UserOptions): Promise<UserModel> {
    try {
      const { withDeleted = false, loadRelations = false } = options || {}
      return await this.repo.findOneOrFail({
        where: [{ id }, { username }],
        withDeleted,
        relations: !loadRelations ? undefined : ['manager']
      })
    } catch {
      throw new NotFoundException('User not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<UserModel> | FindOptionsWhere<UserModel>[]
  ): Promise<UserModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('User not found')
    }
  }

  async team(id: number): Promise<UserModel[]> {
    return await this.repo.findBy({ manager: { id } })
  }

  async list(): Promise<UserModel[]> {
    return await this.repo.find({
      relations: {
        manager: {
          info: {
            user: false
          }
        }
      }
    })
  }

  async update(id: number, input: UpdateUserInput): Promise<UserModel> {
    try {
      if (input?.idManager) {
        await this.setManager(id, input.idManager)
      }

      if (input?.department) {
        await this.setDepartment(id, input.department)
      }

      if (input?.role) {
        await this.setRole(id, input.role)
      }

      if (typeof input?.confirmed === 'boolean') {
        await this.setConfirmed(id, input.confirmed)
      }

      if (typeof input?.blocked === 'boolean') {
        await this.setBlock(id, input.blocked)
      }

      if (typeof input?.deleted === 'boolean') {
        await this.setDeleted(id, input.deleted)
      }

      return await this.get({ id }, { withDeleted: true })
    } catch (error) {
      throw error
    }
  }

  private async setManager(idUser: number, idManager: number): Promise<UserModel> {
    const user = await this.get({ id: idUser })
    const manager = await this.get({ id: idManager })

    if (manager.role === ROLES.USER) {
      throw new ForbiddenException('Entered manager has USER role')
    }

    return await this.repo.save(this.repo.merge(user, { manager }))
  }

  private async setDepartment(idUser: number, idDepartment: number): Promise<UserModel> {
    const user = await this.get({ id: idUser })
    const department = await this.departmentsService.get(idDepartment)

    return await this.repo.save(this.repo.merge(user, { department }))
  }

  private async setRole(id: number, role: ROLES): Promise<UserModel> {
    const user = await this.get({ id })
    return await this.repo.save(this.repo.merge(user, { role }))
  }

  private async setConfirmed(id: number, confirmed: boolean): Promise<UserModel> {
    const user = await this.get({ id })
    return await this.repo.save(this.repo.merge(user, { confirmed }))
  }

  private async setBlock(id: number, blocked = true): Promise<UserModel> {
    const user = await this.get({ id })
    return await this.repo.save(this.repo.merge(user, { blocked }))
  }

  async setDeleted(id: number, deleted = true): Promise<UserModel> {
    const user = await this.repo.findOne({ where: { id }, withDeleted: true })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(user, { deletedAt: null }))
    }

    await this.repo.softDelete({ id: user.id })
    return await this.repo.findOne({
      where: { id: user.id },
      withDeleted: true
    })
  }

  async populate(): Promise<UserModel[]> {
    const users = await this.ldapService.getAll()
    const departments = await this.departmentsService.list({ loadName: true })

    for (const i in users) {
      const user = users[i]

      if (!(await this.repo.findOneBy({ username: user.username }))) {
        const created = await this.create({
          username: user.username,
          email: `${user.username}@slworld.com`,
          role: ROLES.USER
        })

        const department = departments.find((d) => d.name === user.department)
        if (department) await this.update(created.id, { department: department.id })
      }
    }

    return await this.list()
  }

  async setHasPicture(id: number, filename: string): Promise<void> {
    const user = await this.get({ id })
    await this.repo.update(user.id, { picture: filename })
  }

  async removePicture(id: number): Promise<boolean> {
    const user = await this.get({ id })
    const dir = this.configService.get<string>('MULTER_DEST')
    const file = readdirSync(dir).find((file) => file.includes(user.username))

    if (!file) {
      return Promise.reject(false)
    }

    unlinkSync(`${dir}/${file}`)
    await this.repo.update(user.id, { picture: null })
    return Promise.resolve(true)
  }
}
