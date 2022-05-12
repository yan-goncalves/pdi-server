import { ConflictException, forwardRef, Inject } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { Repository } from 'typeorm'
import { CreateUsersInfoInput } from './dto/create-users-info.input'
import { UpdateUsersInfoInput } from './dto/update-users-info.input'
import { UsersInfoModel } from './entities/users-info.entity'

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

  async create(
    user: UserModel | number,
    createUsersInfo: CreateUsersInfoInput
  ): Promise<UsersInfoModel> {
    const userFound = user instanceof UserModel ? user : await this.usersService.get(user)
    const info = await this.repo.findOneBy({ user: { id: userFound.id } })

    if (info) {
      throw new ConflictException(`User's info with id '${userFound.id}' already exists`)
    }

    return await this.repo.save(this.repo.create({ user: userFound, ...createUsersInfo }))
  }

  async update(id: number, updateUsersInfoInput: UpdateUsersInfoInput): Promise<UsersInfoModel> {
    const info = await this.get(id)
    this.repo.merge(info, { ...updateUsersInfoInput })
    return await this.repo.save(info)
  }

  async remove(id: number): Promise<void> {
    const info = await this.get(id)
    await this.repo.delete({ id: info.id })
  }
}
