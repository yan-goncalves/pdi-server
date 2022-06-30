import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsOptional } from 'class-validator'

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
}
