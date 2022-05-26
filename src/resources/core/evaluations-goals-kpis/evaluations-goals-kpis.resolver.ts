import { CreateEvaluationGoalKpiInput } from '@evaluations-goals-kpis/dto/create-evaluation-goal-kpi.input'
import { EvaluationGoalKpiModel } from '@evaluations-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationsGoalsKpisService } from '@evaluations-goals-kpis/evaluations-goals-kpis.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => EvaluationGoalKpiModel)
export class EvaluationsGoalsKpisResolver {
  constructor(
    @Inject(EvaluationsGoalsKpisService) private readonly service: EvaluationsGoalsKpisService
  ) {}

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
