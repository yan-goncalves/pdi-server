import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdatePerformedSkillInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  idRatingUser?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  idRatingManager?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsString()
  endFeedbackUser?: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsString()
  midFeedbackUser?: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsString()
  endFeedbackManager?: string
}
