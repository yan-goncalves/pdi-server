import { ConflictException } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { Repository } from 'typeorm'
import { CreateUsersInfoInput } from './dto/create-users-info.input'
import { UpdateUsersInfoInput } from './dto/update-users-info.input'
import { UsersInfoModel } from './entities/users-info.entity'

@Injectable()
export class UsersInfoService {
  constructor(
    @InjectRepository(UsersInfoModel) private readonly repo: Repository<UsersInfoModel>,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number): Promise<UsersInfoModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`User's info with id '${id}' not found`)
    }
  }

  async create({ idUser, ...props }: CreateUsersInfoInput): Promise<UsersInfoModel> {
    const user = await this.usersService.get(idUser)
    const info = await this.repo.findOneBy({ user: { id: user.id } })

    if (info) {
      throw new ConflictException(`User's info with id '${idUser}' already exists`)
    }

    return await this.repo.save(this.repo.create({ user, ...props }))
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
