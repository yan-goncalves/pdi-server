import { CreateTextFieldInput } from '@components/text-field/dto/create-text-field.input'
import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateTextFieldInput extends CreateTextFieldInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
