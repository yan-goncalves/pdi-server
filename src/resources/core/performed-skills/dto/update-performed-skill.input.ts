import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdatePerformedSkillInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  ratingUser?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  ratingManager?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  midFeedbackManager?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  endFeedbackManager?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  endFeedbackUser?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  midFeedbackUser?: string
}
