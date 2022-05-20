import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PerformedGoalInput } from '@performed-goals/dto/performed-goal.input'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'
import { PerformedGoalsService } from '@performed-goals/performed-goals.service'

@Resolver(() => PerformedGoalModel)
export class PerformedGoalsResolver {
  constructor(@Inject(PerformedGoalsService) private readonly service: PerformedGoalsService) {}

  @Query(() => PerformedGoalModel, { name: 'performedGoal' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedGoalModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedGoalModel], { name: 'performedGoals' })
  async list(): Promise<PerformedGoalModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedGoalModel)
  async createPerformedGoal(@Args('input') input: PerformedGoalInput): Promise<PerformedGoalModel> {
    return await this.service.create(input)
  }
}
