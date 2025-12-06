import {
  EVALUATION_APPROVAL_PERIOD,
  EVALUATION_APPROVAL_STATUS
} from '@constants/evaluation-approval'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional } from 'class-validator'

@InputType()
export class ListEvaluationApprovalsInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(EVALUATION_APPROVAL_STATUS)
  status?: EVALUATION_APPROVAL_STATUS

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(EVALUATION_APPROVAL_PERIOD)
  period?: EVALUATION_APPROVAL_PERIOD
}

