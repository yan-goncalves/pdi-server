import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

@InputType()
class CalibrationInput {
  @Field()
  @IsNotEmpty()
  @IsInt()
  calibrationValue: number

  @Field()
  @IsNotEmpty()
  @IsString()
  calibrationJustification: string
}

@InputType()
export class UpdatePerformedEvaluationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  midFinished?: boolean

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  endFinished?: boolean

  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  calibration?: CalibrationInput
}
