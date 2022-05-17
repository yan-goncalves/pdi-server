import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class EvaluationGoalInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idEvaluation: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idUser: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idGoal: number
}
