import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePerformedGoalKpiInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  idRatingManager?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  achieved?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  midFeedbackUser?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  midFeedbackManager?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  endFeedbackManager?: string
}
