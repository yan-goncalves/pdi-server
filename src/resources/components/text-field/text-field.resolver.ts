import { CreateTextFieldInput } from '@components/text-field/dto/create-text-field.input'
import { UpdateTextFieldInput } from '@components/text-field/dto/update-text-field.input'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import { TextFieldService } from '@components/text-field/text-field.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => TextFieldModel)
export class TextFieldResolver {
  constructor(@Inject(TextFieldService) private readonly service: TextFieldService) {}

  @Query(() => TextFieldModel, { name: 'textField' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<TextFieldModel> {
    return await this.service.get(id)
  }

  @Query(() => [TextFieldModel], { name: 'textField' })
  async list(): Promise<TextFieldModel[]> {
    return await this.service.list()
  }

  @Mutation(() => TextFieldModel)
  async createTextField(@Args('input') input: CreateTextFieldInput): Promise<TextFieldModel> {
    return await this.service.create(input)
  }

  @Mutation(() => TextFieldModel)
  async updateTextField(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTextFieldInput
  ): Promise<TextFieldModel> {
    return await this.service.update(id, input)
  }
}
