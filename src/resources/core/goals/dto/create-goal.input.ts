import { GoalInput } from '@goals/dto/goal.input'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateGoalInput extends GoalInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idEvaluation: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idUser: number
}
