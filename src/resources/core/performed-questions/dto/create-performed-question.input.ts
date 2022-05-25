import { Field, InputType, Int } from '@nestjs/graphql'
import { UpdatePerformedQuestionInput } from '@performed-questions/dto/update-performed-question.input'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePerformedQuestionInput extends UpdatePerformedQuestionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idQuestion: number
}
