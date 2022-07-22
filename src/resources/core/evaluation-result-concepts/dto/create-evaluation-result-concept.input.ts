import { EVALUATION_RESULT_CONCEPT_COLORS } from '@constants/evaluations'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreateEvaluationResultConceptInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  concept: string

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string

  @Field()
  @IsNotEmpty()
  @IsEnum(EVALUATION_RESULT_CONCEPT_COLORS)
  color: EVALUATION_RESULT_CONCEPT_COLORS

  @Field()
  @IsNotEmpty()
  @IsNumber()
  min: number

  @Field()
  @IsNotEmpty()
  @IsNumber()
  max: number
}
