import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdateEvaluationGoalKpiInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  target?: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  weight?: number
}
