import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/create-performed-goal-kpi.input'
import { UpdatePerformedGoalKpiInput } from '@performed-goals-kpis/dto/update-performed-goal-kpi.input'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import { PerformedGoalsKpisService } from '@performed-goals-kpis/performed-goals-kpis.service'

@Resolver(() => PerformedGoalKpiModel)
export class PerformedGoalsKpisResolver {
  constructor(
    @Inject(PerformedGoalsKpisService) private readonly service: PerformedGoalsKpisService
  ) {}

  @Query(() => PerformedGoalKpiModel, { name: 'performedGoalKpi' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedGoalKpiModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedGoalKpiModel], { name: 'performedGoalsKpis' })
  async list(): Promise<PerformedGoalKpiModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedGoalKpiModel)
  async createPerformedGoalKpi(
    @Args('input') input: CreatePerformedGoalKpiInput
  ): Promise<PerformedGoalKpiModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedGoalKpiModel)
  async updatePerformedGoalKpi(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePerformedGoalKpiInput
  ): Promise<PerformedGoalKpiModel> {
    return await this.service.update(id, input)
  }
}
