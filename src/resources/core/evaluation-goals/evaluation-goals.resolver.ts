import { EvaluationGoalInput } from '@evaluation-goals/dto/evaluation-goal.input'
import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import { EvaluationGoalsService } from '@evaluation-goals/evaluation-goals.service'
import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => EvaluationGoalModel)
export class EvaluationGoalsResolver {
  constructor(@Inject(EvaluationGoalsService) private readonly service: EvaluationGoalsService) {}

  @Query(() => EvaluationGoalModel, { name: 'evaluationGoal' })
  async get(@Args('input') input: EvaluationGoalInput): Promise<EvaluationGoalModel> {
    return await this.service.get(input)
  }

  @Query(() => [EvaluationGoalModel], { name: 'evaluationGoals' })
  async list(): Promise<EvaluationGoalModel[]> {
    return await this.service.list()
  }

  @Mutation(() => EvaluationGoalModel)
  async createEvaluationGoal(
    @Args('input') input: EvaluationGoalInput
  ): Promise<EvaluationGoalModel> {
    return await this.service.create(input)
  }

  @Mutation(() => EvaluationGoalModel)
  async removeEvaluationGoal(
    @Args('input') input: EvaluationGoalInput
  ): Promise<EvaluationGoalModel> {
    return await this.service.setDeleted(input)
  }
}
