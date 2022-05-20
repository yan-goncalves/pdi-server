import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePerformedFeedbackInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  midReply?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  endReply?: string
}
