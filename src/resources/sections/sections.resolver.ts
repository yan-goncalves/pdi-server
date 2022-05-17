import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSectionInput } from '@sections/dto/create-section.input'
import { UpdateSectionInput } from '@sections/dto/update-section.input'
import { SectionModel } from '@sections/entities/section.entity'
import { SectionsService } from '@sections/sections.service'

@Resolver(() => SectionModel)
export class SectionsResolver {
  constructor(@Inject(SectionsService) private readonly service: SectionsService) {}

  @Query(() => SectionModel, { name: 'section' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<SectionModel> {
    return await this.service.get(id)
  }

  @Query(() => [SectionModel], { name: 'sections' })
  async list(): Promise<SectionModel[]> {
    return await this.service.list()
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
    return await this.service.update(id, input)
  }

  @Mutation(() => SectionModel)
  async addSectionQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('idQuestion', { type: () => Int }) idQuestion: number
  ): Promise<SectionModel> {
    return await this.service.addQuestion(id, idQuestion)
  }

  @Mutation(() => SectionModel)
  async addSectionSkill(
    @Args('id', { type: () => Int }) id: number,
    @Args('idSkill', { type: () => Int }) idSkill: number
  ): Promise<SectionModel> {
    return await this.service.addSkill(id, idSkill)
  }
}
