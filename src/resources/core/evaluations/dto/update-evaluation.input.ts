import { EVALUATION_PERIOD } from '@constants/evaluations'
import { CreateEvaluationDateInput } from '@evaluations/dto/create-evaluation-date.input'
import { EvaluationDateModel } from '@evaluations/entities/evaluation.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsOptional } from 'class-validator'

@InputType()
export class UpdateEvaluationInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  year?: number

  @Field(() => CreateEvaluationDateInput, { nullable: true })
  @IsOptional()
  mid?: EvaluationDateModel

  @Field(() => CreateEvaluationDateInput, { nullable: true })
  @IsOptional()
  end?: EvaluationDateModel

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(EVALUATION_PERIOD)
  period?: EVALUATION_PERIOD
}
