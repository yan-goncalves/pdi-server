import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePerformedQuestionInput } from '@performed-questions/dto/create-performed-question.input'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import { PerformedQuestionsService } from '@performed-questions/performed-questions.service'
import { UpdatePerformedQuestionInput } from './dto/update-performed-question.input'

@Resolver(() => PerformedQuestionModel)
export class PerformedQuestionsResolver {
  constructor(
    @Inject(PerformedQuestionsService) private readonly service: PerformedQuestionsService
  ) {}

  @Query(() => PerformedQuestionModel, { name: 'performedQuestion' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedQuestionModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedQuestionModel], { name: 'performedQuestions' })
  async list(): Promise<PerformedQuestionModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedQuestionModel)
  async createPerformedQuestion(
    @Args('input') input: CreatePerformedQuestionInput
  ): Promise<PerformedQuestionModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedQuestionModel)
  async updatePerformedQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePerformedQuestionInput
  ): Promise<PerformedQuestionModel> {
    return await this.service.update(id, input)
  }
}
