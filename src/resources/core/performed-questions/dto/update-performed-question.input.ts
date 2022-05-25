import { QUESTION_REPLY } from '@constants/performed'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePerformedQuestionInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(QUESTION_REPLY)
  reply?: QUESTION_REPLY

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  justification?: string
}
