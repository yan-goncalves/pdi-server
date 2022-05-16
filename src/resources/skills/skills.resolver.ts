import { LOCALES } from '@constants/locales'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSkillInput } from '@skills/dto/create-skill.input'
import { UpdateSkillInput } from '@skills/dto/update-skill.input'
import { SkillModel } from '@skills/entities/skill.entity'
import { SkillsService } from '@skills/skills.service'
import { FindOptionsRelations } from 'typeorm'

@Resolver(() => SkillModel)
export class SkillsResolver {
  constructor(@Inject(SkillsService) private readonly service: SkillsService) {}

  @Query(() => SkillModel, { name: 'skill' })
  async get(
    @Args('id', { type: () => Int }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<SkillModel> {
    return await this.service.get(id, locale)
  }

  @Query(() => [SkillModel], { name: 'skills' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES,
    @Args('relations', { nullable: true, defaultValue: [], type: () => [String] })
    relations?: FindOptionsRelations<SkillModel>
  ): Promise<SkillModel[]> {
    return await this.service.list({ locale, relations })
  }

  @Mutation(() => SkillModel)
  async createSkill(@Args('input') input: CreateSkillInput): Promise<SkillModel> {
    return await this.service.create(input)
  }

  @Mutation(() => SkillModel)
  async updateSkill(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateSkillInput
  ): Promise<SkillModel> {
    return await this.service.update(id, input)
  }
}
