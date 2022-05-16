import { LOCALES } from '@constants/locales'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateQuestionInput } from '@questions/dto/create-question.input'
import { UpdateQuestionInput } from '@questions/dto/update-question.input'
import { QuestionModel } from '@questions/entities/question.entity'
import { QuestionsService } from '@questions/questions.service'
import { FindOptionsRelations } from 'typeorm'

@Resolver(() => QuestionModel)
export class QuestionsResolver {
  constructor(@Inject(QuestionsService) private readonly service: QuestionsService) {}

  @Query(() => QuestionModel, { name: 'question' })
  async get(
    @Args('id', { type: () => Int }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<QuestionModel> {
    return await this.service.get(id, locale)
  }

  @Query(() => [QuestionModel], { name: 'questions' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES,
    @Args('relations', { nullable: true, defaultValue: [], type: () => [String] })
    relations?: FindOptionsRelations<QuestionModel>
  ): Promise<QuestionModel[]> {
    return await this.service.list({ locale, relations })
  }

  @Mutation(() => QuestionModel)
  async createQuestion(@Args('input') input: CreateQuestionInput): Promise<QuestionModel> {
    return await this.service.create(input)
  }

  @Mutation(() => QuestionModel)
  async updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateQuestionInput
  ): Promise<QuestionModel> {
    return await this.service.update(id, input)
  }
}
