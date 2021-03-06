import { CreateEvaluationInput } from '@evaluations/dto/create-evaluation.input'
import { UpdateEvaluationInput } from '@evaluations/dto/update-evaluation.input'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { EvaluationsService } from '@evaluations/evaluations.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => EvaluationModel)
export class EvaluationsResolver {
  constructor(@Inject(EvaluationsService) private readonly service: EvaluationsService) {}

  @Query(() => EvaluationModel, { name: 'evaluation' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<EvaluationModel> {
    return await this.service.get(id)
  }

  @Query(() => EvaluationModel)
  async evaluationByYear(
    @Args('year', { type: () => Int }) year: number
  ): Promise<EvaluationModel> {
    return await this.service.getBy({ year })
  }

  @Query(() => [EvaluationModel], { name: 'evaluations' })
  async list(): Promise<EvaluationModel[]> {
    return await this.service.list()
  }

  @Mutation(() => EvaluationModel)
  async createEvaluation(@Args('input') input: CreateEvaluationInput): Promise<EvaluationModel> {
    return await this.service.create(input)
  }

  @Mutation(() => EvaluationModel)
  async addEvaluationSection(
    @Args('id', { type: () => Int }) id: number,
    @Args('idSection', { type: () => Int }) idSection: number
  ): Promise<EvaluationModel> {
    return await this.service.addSection(id, idSection)
  }

  @Mutation(() => EvaluationModel)
  async addEvaluationFeedback(
    @Args('id', { type: () => Int }) id: number,
    @Args('idFeedback', { type: () => Int }) idFeedback: number
  ): Promise<EvaluationModel> {
    return await this.service.addFeedback(id, idFeedback)
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
