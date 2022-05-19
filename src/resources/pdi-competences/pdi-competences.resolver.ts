import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiCompetenceInput } from '@pdi-competences/dto/create-pdi-competence.input'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import { PdiCompetencesService } from '@pdi-competences/pdi-competences.service'
import { UpdatePdiCompetenceInput } from './dto/update-pdi-competence.input'

@Resolver(() => PdiCompetenceModel)
export class PdiCompetencesResolver {
  constructor(@Inject(PdiCompetencesService) private readonly service: PdiCompetencesService) {}

  @Query(() => PdiCompetenceModel, { name: 'pdiCompetence' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiCompetenceModel> {
    return await this.service.get(id)
  }

  @Query(() => [PdiCompetenceModel], { name: 'pdiCompetences' })
  async list(): Promise<PdiCompetenceModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PdiCompetenceModel)
  async createPdiCompetence(
    @Args('input') input: CreatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PdiCompetenceModel)
  async updatePdiCompetence(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => PdiCompetenceModel)
  async removePdiCompetence(
    @Args('id', { type: () => Int }) id: number
  ): Promise<PdiCompetenceModel> {
    return await this.service.delete(id)
  }
}
