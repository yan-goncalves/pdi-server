import { GoalInput } from '@goals/dto/goal.input'
import { GoalModel } from '@goals/entities/goal.entity'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalModel) private readonly repo: Repository<GoalModel>,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number, idManager: number, loadRelations = false): Promise<GoalModel> {
    try {
      return await this.repo.findOneOrFail({
        where: { id, manager: { id: idManager } },
        relations: !loadRelations ? undefined : ['manager']
      })
    } catch {
      throw new NotFoundException('Goal not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<GoalModel> | FindOptionsWhere<GoalModel>[]
  ): Promise<GoalModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('Goal not found')
    }
  }

  async list(idManager: number, isDirector = false): Promise<GoalModel[]> {
    return await this.repo.find({
      where: { manager: { id: !isDirector ? idManager : undefined } },
      relations: !isDirector ? undefined : ['manager']
    })
  }

  async create(idManager: number, { name }: GoalInput): Promise<GoalModel> {
    const manager = await this.usersService.get(idManager)
    const goalFound = await this.repo.findOne({
      where: { manager: { id: manager.id }, name },
      withDeleted: true
    })

    if (goalFound) {
      if (!goalFound?.deletedAt) {
        throw new ConflictException('Goal already exists')
      }
      return await this.repo.save(this.repo.merge(goalFound, { deletedAt: null }))
    }

    return await this.repo.save(this.repo.create({ manager, name }))
  }

  async update(id: number, idManager: number, { name }: GoalInput): Promise<GoalModel> {
    const goalFound = await this.repo.findOneBy({ id, manager: { id: idManager } })
    if (!goalFound) {
      throw new NotFoundException('Goal not found')
    }

    return await this.repo.save(this.repo.merge(goalFound, { name }))
  }

  async setDeleted(id: number, idManager: number, deleted = true): Promise<GoalModel> {
    const goalFound = await this.repo.findOne({
      where: { id, manager: { id: idManager } },
      withDeleted: true
    })

    if (!goalFound) {
      throw new NotFoundException('Goal not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(goalFound, { deletedAt: null }))
    }

    await this.repo.softDelete({ id: goalFound.id })

    return await this.repo.findOne({
      where: { id: goalFound.id },
      withDeleted: true
    })
  }
}
