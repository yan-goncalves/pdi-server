import { CreateFeedbackInput } from '@feedbacks/dto/create-feedback.input'
import { UpdateFeedbackInput } from '@feedbacks/dto/update-feedback.input'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import { FeedbacksService } from '@feedbacks/feedbacks.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => FeedbackModel)
export class FeedbacksResolver {
  constructor(@Inject(FeedbacksService) private readonly service: FeedbacksService) {}

  @Query(() => FeedbackModel, { name: 'feedback' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<FeedbackModel> {
    return await this.service.get(id)
  }

  @Query(() => [FeedbackModel], { name: 'feedbacks' })
  async list(): Promise<FeedbackModel[]> {
    return await this.service.list()
  }

  @Mutation(() => FeedbackModel)
  async createFeedback(@Args('input') input: CreateFeedbackInput): Promise<FeedbackModel> {
    return await this.service.create(input)
  }

  @Mutation(() => FeedbackModel)
  async updateFeedback(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateFeedbackInput
  ): Promise<FeedbackModel> {
    return await this.service.update(id, input)
  }
}
