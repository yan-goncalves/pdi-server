import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { CreateQuestionInput } from './create-question.input'

@InputType()
export class UpdateQuestionInput extends CreateQuestionInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
