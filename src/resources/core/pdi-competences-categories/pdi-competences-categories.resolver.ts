import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiCompetenceCategoryInput } from '@pdi-competences-categories/dto/create-pdi-competence-category.input'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { PdiCompetencesCategoriesService } from '@pdi-competences-categories/pdi-competences-categories.service'

@Resolver(() => PdiCompetenceCategoryModel)
export class PdiCompetencesCategoriesResolver {
  constructor(
    @Inject(PdiCompetencesCategoriesService)
    private readonly service: PdiCompetencesCategoriesService
  ) {}

  @Query(() => PdiCompetenceCategoryModel, { name: 'pdiCompetenceCategory' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiCompetenceCategoryModel> {
    return await this.service.get(id)
  }

  @Query(() => [PdiCompetenceCategoryModel], { name: 'pdiCompetencesCategories' })
  async list(): Promise<PdiCompetenceCategoryModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PdiCompetenceCategoryModel)
  async createPdiCompetenceCategory(
    @Args('input') input: CreatePdiCompetenceCategoryInput
  ): Promise<PdiCompetenceCategoryModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PdiCompetenceCategoryModel)
  async removePdiCompetenceCategory(
    @Args('id', { type: () => Int }) id: number
  ): Promise<PdiCompetenceCategoryModel> {
    return await this.service.delete(id)
  }
}
