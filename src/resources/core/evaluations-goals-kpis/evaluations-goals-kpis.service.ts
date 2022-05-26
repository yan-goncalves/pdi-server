import { CreateEvaluationGoalKpiInput } from '@evaluations-goals-kpis/dto/create-evaluation-goal-kpi.input'
import { EvaluationGoalKpiModel } from '@evaluations-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationsGoalsService } from '@evaluations-goals/evaluations-goals.service'
import { KpisService } from '@kpis/kpis.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class EvaluationsGoalsKpisService {
  constructor(
    @InjectRepository(EvaluationGoalKpiModel)
    private readonly repo: Repository<EvaluationGoalKpiModel>,
    @Inject(EvaluationsGoalsService)
    private readonly evaluationsGoalsService: EvaluationsGoalsService,
    @Inject(KpisService) private readonly kpisService: KpisService
  ) {}

  async get(id: number): Promise<EvaluationGoalKpiModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('EvaluationGoalKpi not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<EvaluationGoalKpiModel> | FindOptionsWhere<EvaluationGoalKpiModel>[]
  ): Promise<EvaluationGoalKpiModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('EvaluationGoalKpi not found')
    }
  }

  async list(): Promise<EvaluationGoalKpiModel[]> {
    return await this.repo.find()
  }

  async create({
    idEvaluationGoal,
    idKpi,
    ...input
  }: CreateEvaluationGoalKpiInput): Promise<EvaluationGoalKpiModel> {
    try {
      const evaluationGoal = await this.evaluationsGoalsService.getBy({ id: idEvaluationGoal })
      const kpi = await this.kpisService.getBy({ id: idKpi })
      return await this.repo.save(this.repo.create({ evaluationGoal, kpi, ...input }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('EvaluationGoalKpi already exists')
    }
  }

  async setDeleted(id: number, deleted = true): Promise<EvaluationGoalKpiModel> {
    const evaluationGoalKpiFound = await this.repo.findOne({ where: { id }, withDeleted: true })

    if (!evaluationGoalKpiFound) {
      throw new NotFoundException('EvaluationGoalKpi not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(evaluationGoalKpiFound, { deletedAt: null }))
    }

    await this.repo.softDelete({ id: evaluationGoalKpiFound.id })

    return await this.repo.findOne({
      where: { id: evaluationGoalKpiFound.id },
      withDeleted: true
    })
  }
}
