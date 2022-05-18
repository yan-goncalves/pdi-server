import { LOCALES } from '@constants/locales'
import { CreateFeedbackInput } from '@feedbacks/dto/create-feedback.input'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateFeedbackInput extends CreateFeedbackInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
