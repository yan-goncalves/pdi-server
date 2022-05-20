import { CreateButtonInput } from '@components/button/dto/create-button.input'
import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateButtonInput extends CreateButtonInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
