import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdatePerformedFeedbackInput } from '@performed-feedbacks/dto/update-performed-feedback.input'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePerformedFeedbackInput extends UpdatePerformedFeedbackInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idFeedback: number
}
