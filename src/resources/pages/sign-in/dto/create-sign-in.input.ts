import { CreateButtonInput } from '@components/button/dto/create-button.input'
import { ButtonModel } from '@components/button/entities/button.entity'
import { CreateTextFieldInput } from '@components/text-field/dto/create-text-field.input'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateSignInInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  caption: string

  @Field(() => CreateTextFieldInput)
  @IsNotEmpty()
  usernameTextField: TextFieldModel

  @Field(() => CreateTextFieldInput)
  @IsNotEmpty()
  passwordTextField: TextFieldModel

  @Field(() => CreateButtonInput)
  @IsNotEmpty()
  button: ButtonModel
}
