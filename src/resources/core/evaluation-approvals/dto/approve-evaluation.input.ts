import { EVALUATION_APPROVAL_PERIOD } from '@constants/evaluation-approval'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class ApproveEvaluationInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformedEvaluation: number

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(EVALUATION_APPROVAL_PERIOD)
  period: EVALUATION_APPROVAL_PERIOD

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Comment must be at least 10 characters long' })
  comment: string
}

