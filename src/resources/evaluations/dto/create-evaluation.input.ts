import { EVALUATION_PERIOD } from '@constants/evaluations'
import { CreateEvaluationDateInput } from '@evaluations/dto/create-evaluation-date.input'
import { EvaluationDateModel } from '@evaluations/entities/evaluation.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator'

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
