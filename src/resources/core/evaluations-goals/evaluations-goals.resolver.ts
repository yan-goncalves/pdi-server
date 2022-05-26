import { EvaluationGoalInput } from '@evaluations-goals/dto/evaluation-goal.input'
import { EvaluationGoalModel } from '@evaluations-goals/entities/evaluation-goal.entity'
import { EvaluationsGoalsService } from '@evaluations-goals/evaluations-goals.service'
import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => EvaluationGoalModel)
export class EvaluationsGoalsResolver {
  constructor(@Inject(EvaluationsGoalsService) private readonly service: EvaluationsGoalsService) {}

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
