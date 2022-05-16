import { EVALUATION_PERIOD } from '@constants/evaluations'
import { EvaluationDateModel } from '@evaluations/entities/evaluation.entity'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator'
import { CreateEvaluationDateInput } from './create-evaluation-date.input'

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

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  finished?: boolean
}
