import { LOCALES } from '@constants/locales'
import { CreateEvaluationInput } from '@evaluations/dto/create-evaluation.input'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { EvaluationsService } from '@evaluations/evaluations.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateEvaluationInput } from './dto/update-evaluation.input'

@Resolver(() => EvaluationModel)
export class EvaluationsResolver {
  constructor(@Inject(EvaluationsService) private readonly service: EvaluationsService) {}

  @Query(() => EvaluationModel, { name: 'evaluation' })
  async get(
    @Args('id', { type: () => Int }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<EvaluationModel> {
    return await this.service.get(id, locale)
  }

  @Query(() => EvaluationModel)
  async evaluationByYear(
    @Args('year', { type: () => Int }) year: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<EvaluationModel> {
    return await this.service.getBy({ year }, locale)
  }

  @Query(() => [EvaluationModel], { name: 'evaluations' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<EvaluationModel[]> {
    return await this.service.list(locale)
  }

  @Mutation(() => EvaluationModel)
  async createEvaluation(@Args('input') input: CreateEvaluationInput): Promise<EvaluationModel> {
    return await this.service.create(input)
  }

  @Mutation(() => Boolean)
  async addEvaluationSection(
    @Args('id', { type: () => Int }) id: number,
    @Args('idSection', { type: () => Int }) idSection: number
  ): Promise<boolean> {
    return await this.service.addSection(id, idSection)
  }

  @Mutation(() => EvaluationModel)
  async updateEvaluation(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEvaluationInput
  ): Promise<EvaluationModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => EvaluationModel)
  async removeEvaluation(@Args('id', { type: () => Int }) id: number): Promise<EvaluationModel> {
    return await this.service.setDeleted(id)
  }
}
