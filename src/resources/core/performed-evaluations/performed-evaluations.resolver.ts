import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePerformedEvaluationInput } from '@performed-evaluations/dto/create-performed-evaluation.input'
import { UpdatePerformedEvaluationInput } from '@performed-evaluations/dto/update-performed-evaluation.input'
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

  @Query(() => PerformedEvaluationModel, { name: 'performedEvaluationRelation' })
  async getByRelation(
    @Args('input') input: CreatePerformedEvaluationInput
  ): Promise<PerformedEvaluationModel> {
    return await this.service.getByRelation(input)
  }

  @Query(() => [PerformedEvaluationModel], { name: 'performedEvaluations' })
  async list(): Promise<PerformedEvaluationModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedEvaluationModel)
  async createPerformedEvaluation(
    @Args('input') input: CreatePerformedEvaluationInput
  ): Promise<PerformedEvaluationModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedEvaluationModel)
  async updatePerformedEvaluation(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePerformedEvaluationInput
  ): Promise<PerformedEvaluationModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => PerformedEvaluationModel)
  async removePerformedEvaluation(
    @Args('id', { type: () => Int }) id: number
  ): Promise<PerformedEvaluationModel> {
    return await this.service.delete(id)
  }
}
