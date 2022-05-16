import { EVALUATION_PERIOD } from '@constants/evaluations'
import { EvaluationDateModel } from '@evaluations/entities/evaluation.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator'
import { CreateEvaluationDateInput } from './create-evaluation-date.input'

@InputType()
export class CreateEvaluationInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  year: number

  @Field(() => CreateEvaluationDateInput)
  @IsNotEmpty()
  mid: EvaluationDateModel

  @Field(() => CreateEvaluationDateInput)
  @IsNotEmpty()
  end: EvaluationDateModel

  @Field({ nullable: true, defaultValue: EVALUATION_PERIOD.OUT })
  @IsOptional()
  @IsEnum(EVALUATION_PERIOD)
  period?: EVALUATION_PERIOD
}
