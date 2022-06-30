import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserInfoInput } from '@users-info/dto/create-user-info.input'
import { UpdateUserInfoInput } from '@users-info/dto/update-user-info.input'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { Repository } from 'typeorm'

@Injectable()
export class UsersInfoService {
  constructor(
    @InjectRepository(UsersInfoModel) private readonly repo: Repository<UsersInfoModel>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService
  ) {}

  async get(id: number): Promise<UsersInfoModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`User's info with id '${id}' not found`)
    }
  }

  async create(user: UserModel | number, input: CreateUserInfoInput): Promise<UsersInfoModel> {
    const userFound = user instanceof UserModel ? user : await this.usersService.get({ id: user })
    const info = await this.repo.findOneBy({ user: { id: userFound.id } })

    if (info) {
      throw new ConflictException(`User's info with id '${userFound.id}' already exists`)
    }

    return await this.repo.save(this.repo.create({ user: userFound, ...input }))
  }

  async update(id: number, input: UpdateUserInfoInput): Promise<UsersInfoModel> {
    const info = await this.get(id)
    this.repo.merge(info, { ...input })
    return await this.repo.save(info)
  }

  async remove(id: number): Promise<void> {
    const info = await this.get(id)
    await this.repo.delete({ id: info.id })
  }
}
