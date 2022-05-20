import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePerformedFeedbackInput } from '@performed-feedbacks/dto/create-performed-feedback.input'
import { UpdatePerformedFeedbackInput } from '@performed-feedbacks/dto/update-performed-feedback.input'
import { PerformedFeedbackModel } from '@performed-feedbacks/entities/performed-feedback.entity'
import { PerformedFeedbacksService } from '@performed-feedbacks/performed-feedbacks.service'

@Resolver(() => PerformedFeedbackModel)
export class PerformedFeedbacksResolver {
  constructor(
    @Inject(PerformedFeedbacksService) private readonly service: PerformedFeedbacksService
  ) {}

  @Query(() => PerformedFeedbackModel, { name: 'performedFeedback' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedFeedbackModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedFeedbackModel], { name: 'performedFeedbacks' })
  async list(): Promise<PerformedFeedbackModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedFeedbackModel)
  async createPerformedFeedback(
    @Args('input') input: CreatePerformedFeedbackInput
  ): Promise<PerformedFeedbackModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedFeedbackModel)
  async removePerformedFeedback(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePerformedFeedbackInput
  ): Promise<PerformedFeedbackModel> {
    return await this.service.update(id, input)
  }
}
