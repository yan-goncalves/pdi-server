import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateEvaluationResultConceptInput } from '@evaluation-result-concepts/dto/create-evaluation-result-concept.input'
import { UpdateEvaluationResultConceptInput } from '@evaluation-result-concepts/dto/update-evaluation-result-concept.input'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
import { EvaluationResultConceptsService } from '@evaluation-result-concepts/evaluation-result-concepts.service'

@Resolver(() => EvaluationResultConceptModel)
export class EvaluationResultConceptsResolver {
  constructor(@Inject(EvaluationResultConceptsService) private readonly service: EvaluationResultConceptsService) {}

  @Query(() => EvaluationResultConceptModel, { name: 'evaluationResultConcept' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<EvaluationResultConceptModel> {
    return await this.service.get(id)
  }

  @Query(() => [EvaluationResultConceptModel], { name: 'evaluationResultConcepts' })
  async list(): Promise<EvaluationResultConceptModel[]> {
    return await this.service.list()
  }

  @Mutation(() => EvaluationResultConceptModel)
  async createEvaluationResultConcept(@Args('input') input: CreateEvaluationResultConceptInput): Promise<EvaluationResultConceptModel> {
    return await this.service.create(input)
  }

  @Mutation(() => EvaluationResultConceptModel)
  async updateEvaluationResultConcept(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEvaluationResultConceptInput
  ): Promise<EvaluationResultConceptModel> {
    return await this.service.update(id, input)
  }
}
