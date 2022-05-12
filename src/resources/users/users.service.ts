import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UserModel } from '@users/entities/user.entity'
import { UsersInfoService } from '@users-info/users-info.service'
import { LdapService } from '@ldap/ldap.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private readonly repo: Repository<UserModel>,
    @Inject(forwardRef(() => UsersInfoService)) private readonly usersInfoService: UsersInfoService,
    @Inject(LdapService) private readonly ldapService: LdapService
  ) {}

  async create({ email, username, role }: CreateUserInput): Promise<UserModel> {
    const userFound = await this.repo.findOneBy({ email, username })

    if (userFound) {
      if (!userFound.deletedAt) {
        throw new ConflictException(`User '${username}' already exists`)
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

  async list(): Promise<UserModel[]> {
    return await this.repo.find({ relations: ['info'] })
  }

  async get(id: number): Promise<UserModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`User with id '${id}' not found`)
    }
  }

  async setConfirmed(id: number): Promise<UserModel> {
    const userFound = await this.get(id)
    this.repo.merge(userFound, { confirmed: true })
    return await this.repo.save(userFound)
  }

  async block(id: number): Promise<UserModel> {
    const userFound = await this.get(id)
    this.repo.merge(userFound, { blocked: true })
    return await this.repo.save(userFound)
  }

  async delete(id: number): Promise<UserModel> {
    const userFound = await this.get(id)
    await this.repo.softDelete({ id: userFound.id })
    return await this.repo.findOne({
      where: { id: userFound.id },
      withDeleted: true
    })
  }
}
