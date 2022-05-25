import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PerformedEvaluationInput } from '@performed-evaluations/dto/performed-evaluation.input'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'

@Resolver(() => PerformedEvaluationModel)
export class PerformedEvaluationsResolver {
  constructor(
    @Inject(PerformedEvaluationsService) private readonly service: PerformedEvaluationsService
  ) {}

  @Query(() => PerformedEvaluationModel, { name: 'performedEvaluation' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedEvaluationModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedEvaluationModel], { name: 'performedEvaluations' })
  async list(): Promise<PerformedEvaluationModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedEvaluationModel)
  async createPerformedEvaluation(
    @Args('input') input: PerformedEvaluationInput
  ): Promise<PerformedEvaluationModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedEvaluationModel)
  async removePerformedEvaluation(
    @Args('id', { type: () => Int }) id: number
  ): Promise<PerformedEvaluationModel> {
    return await this.service.delete(id)
  }
}
