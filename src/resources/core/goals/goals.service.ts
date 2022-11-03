import { EvaluationsService } from '@evaluations/evaluations.service'
import { CreateGoalInput } from '@goals/dto/create-goal.input'
import { GoalInput } from '@goals/dto/goal.input'
import { GoalModel } from '@goals/entities/goal.entity'
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { ListGoalInput } from './dto/list-goal.input'

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(GoalModel) private readonly repo: Repository<GoalModel>,
    @Inject(EvaluationsService) private readonly evaluationsService: EvaluationsService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number, idManager: number, loadRelations = false): Promise<GoalModel> {
    try {
      return await this.repo.findOneOrFail({
        where: { id, manager: { id: idManager } },
        relations: !loadRelations ? undefined : ['manager', 'user']
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

  async list(idManager: number): Promise<GoalModel[]> {
    const list = await this.repo.find({
      where: { manager: { id: idManager } },
      relations: ['manager']
    })

    return list.filter(
      (value, index, self) => self.map((goal) => goal.name).indexOf(value.name) === index
    )
  }

  async evaluationGoals({ idEvaluation, idUser }: ListGoalInput): Promise<GoalModel[]> {
    const evaluation = await this.evaluationsService.get(idEvaluation)
    const user = await this.usersService.get({ id: idUser }, { loadRelations: true })

    return await this.repo.findBy({
      evaluation: { id: evaluation.id },
      manager: { id: user?.manager?.id },
      user: { id: user.id }
    })
  }

  async create(
    idManager: number,
    { idEvaluation, idUser, name }: CreateGoalInput
  ): Promise<GoalModel> {
    const evaluation = await this.evaluationsService.get(idEvaluation)
    const manager = await this.usersService.get({ id: idManager })
    const user = await this.usersService.get({ id: idUser }, { loadRelations: true })

    if (manager.id !== user.manager.id) {
      throw new ForbiddenException('You are not the manager of this user ')
    }

    try {
      return await this.repo.save(this.repo.create({ evaluation, manager, user, name }))
    } catch {
      throw new ConflictException('Goal already exists')
    }
  }

  async update(id: number, idManager: number, { name }: GoalInput): Promise<GoalModel> {
    const manager = await this.usersService.get({ id: idManager })
    const goalFound = await this.getBy({ id, manager: { id: manager.id } })

    return await this.repo.save(this.repo.merge(goalFound, { name }))
  }

  async delete(id: number, idManager: number): Promise<GoalModel> {
    const manager = await this.usersService.get({ id: idManager })
    const goalFound = await this.getBy({ id, manager: { id: manager.id } })

    await this.repo.delete({ id: goalFound.id })

    return goalFound
  }
}
