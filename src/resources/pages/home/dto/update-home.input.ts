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
}
