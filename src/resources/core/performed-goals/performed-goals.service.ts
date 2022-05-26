import { EvaluationsGoalsService } from '@evaluations-goals/evaluations-goals.service'
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
    @Inject(EvaluationsGoalsService)
    private readonly evaluationsGoalsService: EvaluationsGoalsService
  ) {}

  async get(id: number): Promise<PerformedGoalModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
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

  async list(): Promise<PerformedGoalModel[]> {
    return await this.repo.find()
  }

  async create({ idPerformed, idEvaluationGoal }: PerformedGoalInput): Promise<PerformedGoalModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const evaluationGoal = await this.evaluationsGoalsService.getBy({ id: idEvaluationGoal })
      return await this.repo.save(this.repo.create({ performed, evaluationGoal }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PerformedGoal already exists')
    }
  }
}
