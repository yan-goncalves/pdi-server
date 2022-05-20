import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiQualityInput } from '@pdi-qualities/dto/create-pdi-quality.input'
import { UpdatePdiQualityInput } from '@pdi-qualities/dto/update-pdi-quality.input'
import { PdiQualityModel } from '@pdi-qualities/entities/pdi-quality.entity'
import { PdiQualitiesService } from '@pdi-qualities/pdi-qualities.service'

@Resolver(() => PdiQualityModel)
export class PdiQualitiesResolver {
  constructor(@Inject(PdiQualitiesService) private readonly service: PdiQualitiesService) {}

  @Query(() => PdiQualityModel, { name: 'pdiQuality' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiQualityModel> {
    return await this.service.get(id)
  }

  @Query(() => [PdiQualityModel], { name: 'pdiQualities' })
  async list(): Promise<PdiQualityModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PdiQualityModel)
  async createPdiQuality(@Args('input') input: CreatePdiQualityInput): Promise<PdiQualityModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PdiQualityModel)
  async updatePdiQuality(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiQualityInput
  ): Promise<PdiQualityModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => PdiQualityModel)
  async removePdiQuality(@Args('id', { type: () => Int }) id: number): Promise<PdiQualityModel> {
    return await this.service.delete(id)
  }
}
