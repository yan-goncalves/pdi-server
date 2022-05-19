import { QUESTION_REPLY } from '@constants/performed'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePerformedQuestionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idQuestion: number

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(QUESTION_REPLY)
  reply?: QUESTION_REPLY

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  justification?: string
}
