import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateEvaluationGoalKpiInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idEvaluationGoal: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idKpi: number

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  target: string

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  weight: number
}
