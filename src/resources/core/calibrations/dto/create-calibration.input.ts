import { Field, Float, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsNumber, Max, Min, MinLength } from 'class-validator'

@InputType()
export class CreateCalibrationInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformedEvaluation: number

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(-3.0)
  @Max(3.0)
  calibrationValue: number

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(10)
  comment: string
}

