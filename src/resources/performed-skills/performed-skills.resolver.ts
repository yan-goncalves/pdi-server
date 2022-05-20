import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePerformedSkillInput } from '@performed-skills/dto/create-performed-skill.input'
import { UpdatePerformedSkillInput } from '@performed-skills/dto/update-performed-skill.input'
import { PerformedSkillModel } from '@performed-skills/entities/performed-skill.entity'
import { PerformedSkillsService } from '@performed-skills/performed-skills.service'

@Resolver(() => PerformedSkillModel)
export class PerformedSkillsResolver {
  constructor(@Inject(PerformedSkillsService) private readonly service: PerformedSkillsService) {}

  @Query(() => PerformedSkillModel, { name: 'performedSkill' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PerformedSkillModel> {
    return await this.service.get(id)
  }

  @Query(() => [PerformedSkillModel], { name: 'performedSkills' })
  async list(): Promise<PerformedSkillModel[]> {
    return await this.service.list()
  }

  @Mutation(() => PerformedSkillModel)
  async createPerformedSkill(
    @Args('input') input: CreatePerformedSkillInput
  ): Promise<PerformedSkillModel> {
    return await this.service.create(input)
  }

  @Mutation(() => PerformedSkillModel)
  async updatePerformedSkill(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePerformedSkillInput
  ): Promise<PerformedSkillModel> {
    return await this.service.update(id, input)
  }
}
