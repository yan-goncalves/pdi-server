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
import { InjectRepository } from '@nestjs/typeorm'
import { UsersInfoService } from '@users-info/users-info.service'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UpdateUserInput } from '@users/dto/update-user.input'
import { UserModel } from '@users/entities/user.entity'
import { compare } from 'bcrypt'
import { FindOptionsWhere, Repository } from 'typeorm'

export type UserOptions = {
  withDeleted?: boolean
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private readonly repo: Repository<UserModel>,
    @Inject(LdapService) private readonly ldapService: LdapService,
    @Inject(forwardRef(() => UsersInfoService)) private readonly usersInfoService: UsersInfoService,
    @Inject(DepartmentsService) private readonly departmentsService: DepartmentsService
  ) {}

  async validate(identifier: string, password: string): Promise<UserModel> {
    const user = await this.repo.findOneBy([{ username: identifier }, { email: identifier }])

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

    const user = await this.repo.save(this.repo.create({ email, username, role }))
    const ldapInfo = await this.ldapService.getByUsername(user.username)
    const info = await this.usersInfoService.create(user, ldapInfo)

    this.repo.merge(user, { info })
    return await this.repo.save(user)
  }

  async get(id: number, options?: UserOptions): Promise<UserModel> {
    const { withDeleted = false } = options || {}

    const user = await this.repo.findOneOrFail({ where: { id }, withDeleted })
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`)
    }
    const department = await this.departmentsService.get(user.department?.id)

    return !department ? user : { ...user, department }
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

  async list(): Promise<UserModel[]> {
    return await this.repo.find()
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

      return await this.get(id, { withDeleted: true })
    } catch (error) {
      throw error
    }
  }

  private async setManager(idUser: number, idManager: number): Promise<UserModel> {
    const user = await this.get(idUser)
    const manager = await this.get(idManager)

    if (manager.role === ROLES.USER) {
      throw new ForbiddenException('Entered manager has USER role')
    }

    return await this.repo.save(this.repo.merge(user, { manager }))
  }

  private async setDepartment(idUser: number, idDepartment: number): Promise<UserModel> {
    const user = await this.get(idUser)
    const department = await this.departmentsService.get(idDepartment)

    return await this.repo.save(this.repo.merge(user, { department }))
  }

  private async setRole(id: number, role: ROLES): Promise<UserModel> {
    const user = await this.get(id)
    return await this.repo.save(this.repo.merge(user, { role }))
  }

  private async setConfirmed(id: number, confirmed: boolean): Promise<UserModel> {
    const user = await this.get(id)
    return await this.repo.save(this.repo.merge(user, { confirmed }))
  }

  private async setBlock(id: number, blocked = true): Promise<UserModel> {
    const user = await this.get(id)
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
}
