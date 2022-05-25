import { EvaluationGoalsKpisService } from '@evaluation-goals-kpis/evaluation-goals-kpis.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { CreatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/create-performed-goal-kpi.input'
import { UpdatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/update-performed-goal-kpi.input'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import { RatingsService } from '@ratings/ratings.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PerformedGoalsKpisService {
  constructor(
    @InjectRepository(PerformedGoalKpiModel)
    private readonly repo: Repository<PerformedGoalKpiModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(EvaluationGoalsKpisService)
    private readonly goalsKpisService: EvaluationGoalsKpisService,
    @Inject(RatingsService) private readonly ratingsService: RatingsService
  ) {}

  async get(id: number): Promise<PerformedGoalKpiModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PerformedGoalKpi not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PerformedGoalKpiModel> | FindOptionsWhere<PerformedGoalKpiModel>[]
  ): Promise<PerformedGoalKpiModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedGoalKpi not found')
    }
  }

  async list(): Promise<PerformedGoalKpiModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    idEvaluationGoalKpi,
    idRatingManager,
    ...input
  }: CreatePerformedGoalKpiInput): Promise<PerformedGoalKpiModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const evaluationGoalKpi = await this.goalsKpisService.get(idEvaluationGoalKpi)
      const ratingManager = await this.ratingsService.get(idRatingManager)
      return await this.repo.save(
        this.repo.create({
          performed,
          evaluationGoalKpi,
          ratingManager,
          ...input
        })
      )
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PerformedGoalKpi already exists')
    }
  }

  async update(
    id: number,
    { idRatingManager, ...input }: UpdatePerformedGoalKpiInput
  ): Promise<PerformedGoalKpiModel> {
    try {
      const performedGoalKpi = await this.get(id)
      const ratingManager = await this.ratingsService.get(idRatingManager)
      this.repo.merge(performedGoalKpi, { ratingManager, ...input })
      return await this.repo.save(performedGoalKpi)
    } catch (error) {
      throw error
    }
  }
}
