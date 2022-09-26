import { GoalsService } from '@goals/goals.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { PerformedGoalInput } from '@performed-goals/dto/performed-goal.input'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PerformedGoalsService {
  constructor(
    @InjectRepository(PerformedGoalModel) private readonly repo: Repository<PerformedGoalModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(GoalsService)
    private readonly goalsService: GoalsService
  ) {}

  async get(id: number, relations?: string[]): Promise<PerformedGoalModel> {
    try {
      return await this.repo.findOneOrFail({ where: { id }, relations })
    } catch {
      throw new NotFoundException('PerformedGoal not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PerformedGoalModel> | FindOptionsWhere<PerformedGoalModel>[]
  ): Promise<PerformedGoalModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedGoal not found')
    }
  }

  async getByRelation({ idPerformed, idGoal }: PerformedGoalInput): Promise<PerformedGoalModel> {
    const performedEvaluation = await this.performedService.getBy({ id: idPerformed })
    const goal = await this.goalsService.getBy({ id: idGoal })

    try {
      return await this.repo.findOneByOrFail({
        performed: { id: performedEvaluation.id },
        goal: { id: goal.id }
      })
    } catch {
      throw new NotFoundException('PerformedGoal not found')
    }
  }

  async list(): Promise<PerformedGoalModel[]> {
    return await this.repo.find()
  }

  async create({ idPerformed, idGoal }: PerformedGoalInput): Promise<PerformedGoalModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const goal = await this.goalsService.getBy({ id: idGoal })
      return await this.repo.save(this.repo.create({ performed, goal }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PerformedGoal already exists')
    }
  }
}
