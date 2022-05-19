import { QUESTION_REPLY } from '@constants/performed'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdatePerformedQuestionInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(QUESTION_REPLY)
  reply?: QUESTION_REPLY

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  justification?: string
}
