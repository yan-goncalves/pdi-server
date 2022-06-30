import { ButtonService } from '@components/button/button.service'
import { CreateButtonInput } from '@components/button/dto/create-button.input'
import { UpdateButtonInput } from '@components/button/dto/update-button.input'
import { ButtonModel } from '@components/button/entities/button.entity'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => ButtonModel)
export class ButtonResolver {
  constructor(@Inject(ButtonService) private readonly service: ButtonService) {}

  @Query(() => ButtonModel, { name: 'button' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<ButtonModel> {
    return await this.service.get(id)
  }

  @Query(() => [ButtonModel], { name: 'buttons' })
  async list(): Promise<ButtonModel[]> {
    return await this.service.list()
  }

  @Mutation(() => ButtonModel)
  async createButton(@Args('input') input: CreateButtonInput): Promise<ButtonModel> {
    return await this.service.create(input)
  }

  @Mutation(() => ButtonModel)
  async updateButton(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateButtonInput
  ): Promise<ButtonModel> {
    return await this.service.update(id, input)
  }
}
