import { Field, InputType } from '@nestjs/graphql'
import { IsDateString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateEvaluationDateInput {
  @Field(() => Date)
  @IsNotEmpty()
  @IsDateString()
  start: Date

  @Field(() => Date)
  @IsNotEmpty()
  @IsDateString()
  deadline: Date
}
