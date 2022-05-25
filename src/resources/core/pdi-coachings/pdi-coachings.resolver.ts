import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiCoachingInput } from 'src/resources/core/pdi-coachings/dto/create-pdi-coaching.input'
import { UpdatePdiCoachingInput } from 'src/resources/core/pdi-coachings/dto/update-pdi-coaching.input'
import { PdiCoachingModel } from 'src/resources/core/pdi-coachings/entities/pdi-coaching.entity'
import { PdiCoachingsService } from 'src/resources/core/pdi-coachings/pdi-coachings.service'

@Resolver(() => PdiCoachingModel)
export class PdiCoachingsResolver {
  constructor(@Inject(PdiCoachingsService) private readonly service: PdiCoachingsService) {}

  @Query(() => PdiCoachingModel, { name: 'pdiCoaching' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiCoachingModel> {
    return await this.service.get(id)
  }

  @Query(() => [PdiCoachingModel], { name: 'pdiCoachings' })
  async list(): Promise<PdiCoachingModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PdiCoachingModel)
  async createPdiCoaching(@Args('input') input: CreatePdiCoachingInput): Promise<PdiCoachingModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PdiCoachingModel)
  async updatePdiCoaching(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => PdiCoachingModel)
  async removePdiCoaching(@Args('id', { type: () => Int }) id: number): Promise<PdiCoachingModel> {
    return await this.service.delete(id)
  }
}
