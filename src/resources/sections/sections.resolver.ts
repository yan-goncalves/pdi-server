import { LOCALES } from '@constants/locales'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSectionInput } from '@sections/dto/create-section.input'
import { UpdateSectionInput } from '@sections/dto/update-section.input'
import { SectionModel } from '@sections/entities/section.entity'
import { SectionsService } from '@sections/sections.service'
import { FindOptionsRelations } from 'typeorm'

@Resolver(() => SectionModel)
export class SectionsResolver {
  constructor(@Inject(SectionsService) private readonly service: SectionsService) {}

  @Query(() => SectionModel, { name: 'section' })
  async get(
    @Args('id', { type: () => Int }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<SectionModel> {
    return this.service.get(id, locale)
  }

  @Query(() => [SectionModel], { name: 'sections' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES,
    @Args('relations', { nullable: true, defaultValue: [], type: () => [String] })
    relations?: FindOptionsRelations<SectionModel>
  ): Promise<SectionModel[]> {
    return await this.service.list({ locale, relations })
  }

  @Mutation(() => SectionModel)
  async createSection(@Args('input') input: CreateSectionInput): Promise<SectionModel> {
    return await this.service.create(input)
  }

  @Mutation(() => SectionModel)
  async updateSection(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateSectionInput
  ): Promise<SectionModel> {
    return this.service.update(id, input)
  }
}
