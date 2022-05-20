import { UpdateButtonInput } from '@components/button/dto/update-button.input'
import { ButtonModel } from '@components/button/entities/button.entity'
import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { CreateHomeInput } from '@pages/home/dto/create-home.input'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateHomeInput extends CreateHomeInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES

  @Field(() => UpdateButtonInput)
  @IsNotEmpty()
  button: ButtonModel
}
