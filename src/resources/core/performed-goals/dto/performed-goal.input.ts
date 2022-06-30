import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class PerformedGoalInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idGoal: number
}
