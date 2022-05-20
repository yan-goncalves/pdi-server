import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { CreateQuestionInput } from '@questions/dto/create-question.input'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateQuestionInput extends CreateQuestionInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
