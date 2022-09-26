import { KpisService } from '@kpis/kpis.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/create-performed-goal-kpi.input'
import { UpdatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/update-performed-goal-kpi.input'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import { PerformedGoalsService } from '@performed-goals/performed-goals.service'
import { RatingsService } from '@ratings/ratings.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PerformedGoalsKpisService {
  constructor(
    @InjectRepository(PerformedGoalKpiModel)
    private readonly repo: Repository<PerformedGoalKpiModel>,
    @Inject(PerformedGoalsService)
    private readonly performedGoalsService: PerformedGoalsService,
    @Inject(KpisService)
    private readonly kpisService: KpisService,
    @Inject(RatingsService) private readonly ratingsService: RatingsService
  ) {}

  async get(id: number, relations?: string[]): Promise<PerformedGoalKpiModel> {
    try {
      return await this.repo.findOneOrFail({ where: { id }, relations })
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
    idPerformedGoal,
    idKpi,
    ratingManager,
    ...input
  }: CreatePerformedGoalKpiInput): Promise<PerformedGoalKpiModel> {
    try {
      const typeofRating = typeof ratingManager === 'number'
      const ratinManagerFound = !typeofRating ? null : await this.ratingsService.get(ratingManager)
      const performedGoal = await this.performedGoalsService.get(idPerformedGoal, ['performed'])
      const kpi = await this.kpisService.get(idKpi, performedGoal.goal.manager.id)
      return await this.repo.save(
        this.repo.create({
          performedGoal,
          kpi,
          ratingManager: ratinManagerFound,
          ...input
        })
      )
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('PerformedGoalKpi already exists')
      }
      throw error
    }
  }

  async update(
    id: number,
    { ratingManager, ...input }: UpdatePerformedGoalKpiInput
  ): Promise<PerformedGoalKpiModel> {
    try {
      const performedGoalKpi = await this.get(id, ['performedGoal', 'performedGoal.performed'])
      this.repo.merge(performedGoalKpi, { ...input })
      await this.repo.save(performedGoalKpi)

      if (typeof ratingManager === 'number') {
        const ratingFound = ratingManager >= 0 ? await this.ratingsService.get(ratingManager) : null

        await this.repo.update(
          { id: performedGoalKpi.id },
          {
            ...input,
            ratingManager: ratingFound
          }
        )

        const idPerformed = performedGoalKpi.performedGoal.performed.id
        this.repo.query(`EXEC CalcGrade @PERFORMED = ${idPerformed}`)
      }

      return await this.repo.findOneBy({ id: performedGoalKpi.id })
    } catch (error) {
      throw new error()
    }
  }
}
