import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateEvaluationGoalKpiInput } from '@evaluation-goals-kpis/dto/create-evaluation-goal-kpi.input'
import { EvaluationGoalKpiModel } from '@evaluation-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationGoalsKpisService } from '@evaluation-goals-kpis/evaluation-goals-kpis.service'

@Resolver(() => EvaluationGoalKpiModel)
export class EvaluationGoalsKpisResolver {
  constructor(@Inject(EvaluationGoalsKpisService) private readonly service: EvaluationGoalsKpisService) {}

  @Query(() => EvaluationGoalKpiModel, { name: 'evaluationGoalKpi' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<EvaluationGoalKpiModel> {
    return await this.service.get(id)
  }

  @Query(() => [EvaluationGoalKpiModel], { name: 'evaluationGoalsKpis' })
  async list(): Promise<EvaluationGoalKpiModel[]> {
    return await this.service.list()
  }

  @Mutation(() => EvaluationGoalKpiModel)
  async createEvaluationGoalKpi(
    @Args('input') input: CreateEvaluationGoalKpiInput
  ): Promise<EvaluationGoalKpiModel> {
    return await this.service.create(input)
  }

  @Mutation(() => EvaluationGoalKpiModel)
  async removeEvaluationGoalKpi(
    @Args('id', { type: () => Int }) id: number
  ): Promise<EvaluationGoalKpiModel> {
    return await this.service.setDeleted(id)
  }
}
