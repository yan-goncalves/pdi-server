import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UserModel } from '@users/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserModel) private readonly repo: Repository<UserModel>) {}

  async create({ email, username, role }: CreateUserInput): Promise<UserModel> {
    const userFound = await this.repo.findOneBy({ email, username })

    if (userFound) {
      if (!userFound.deletedAt) {
        throw new ConflictException(`User '${username}' already exists`)
      }

      this.repo.merge(userFound, { blocked: false, deletedAt: null })
      return await this.repo.save(userFound)
    }

    return await this.repo.save(this.repo.create({ email, username, role }))
  }

  async list(): Promise<UserModel[]> {
    return await this.repo.find()
  }

  async get(id: number): Promise<UserModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`User with id '${id}' not found`)
    }
  }

  async block(id: number): Promise<void> {
    const userFound = await this.get(id)
    this.repo.merge(userFound, { blocked: true })
    await this.repo.save(userFound)
  }

  async delete(id: number): Promise<void> {
    const userFound = await this.get(id)
    await this.repo.softDelete({ id: userFound.id })
  }
}
