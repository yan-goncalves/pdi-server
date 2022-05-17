import { EvaluationGoalInput } from '@evaluation-goals/dto/evaluation-goal.input'
import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import { EvaluationsService } from '@evaluations/evaluations.service'
import { GoalsService } from '@goals/goals.service'
import { KpisService } from '@kpis/kpis.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class EvaluationGoalsService {
  constructor(
    @InjectRepository(EvaluationGoalModel) private readonly repo: Repository<EvaluationGoalModel>,
    @Inject(EvaluationsService) private readonly evaluationsService: EvaluationsService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(GoalsService) private readonly goalsService: GoalsService,
    @Inject(KpisService) private readonly kpisService: KpisService
  ) {}

  async get({ idEvaluation, idGoal, idUser }: EvaluationGoalInput): Promise<EvaluationGoalModel> {
    try {
      const evaluation = await this.evaluationsService.get(idEvaluation)
      const user = await this.usersService.get(idUser)
      const goal = await this.goalsService.get(idGoal, user.manager.id)

      return await this.repo.findOneByOrFail({
        evaluation: { id: evaluation.id },
        user: { id: user.id },
        goal: { id: goal.id }
      })
    } catch {
      throw new NotFoundException('EvaluationGoal not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<EvaluationGoalModel> | FindOptionsWhere<EvaluationGoalModel>[]
  ): Promise<EvaluationGoalModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('EvaluationGoal not found')
    }
  }

  async list(): Promise<EvaluationGoalModel[]> {
    return await this.repo.find()
  }

  async create({
    idEvaluation,
    idGoal,
    idUser
  }: EvaluationGoalInput): Promise<EvaluationGoalModel> {
    const evaluation = await this.evaluationsService.get(idEvaluation)
    const goal = await this.evaluationsService.get(idGoal)
    const user = await this.evaluationsService.get(idUser)

    const evaluationGoalFound = await this.repo.findOneBy({
      evaluation: { id: evaluation.id },
      goal: { id: goal.id },
      user: { id: user.id }
    })
    if (evaluationGoalFound) {
      throw new ConflictException('EvaluationGoal already exists')
    }

    return await this.repo.save(this.repo.create({ evaluation, goal, user }))
  }

  async setDeleted(
    { idEvaluation, idGoal, idUser }: EvaluationGoalInput,
    deleted = true
  ): Promise<EvaluationGoalModel> {
    const evaluationGoalFound = await this.get({ idEvaluation, idGoal, idUser })

    if (!evaluationGoalFound) {
      throw new NotFoundException('EvaluationGoal not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(evaluationGoalFound, { deletedAt: null }))
    }

    const { evaluation, user, goal } = evaluationGoalFound
    await this.repo.softDelete({
      evaluation: { id: evaluation.id },
      user: { id: user.id },
      goal: { id: goal.id }
    })

    return await this.repo.findOne({
      where: {
        evaluation: { id: evaluation.id },
        user: { id: user.id },
        goal: { id: goal.id }
      },
      withDeleted: true
    })
  }
}
