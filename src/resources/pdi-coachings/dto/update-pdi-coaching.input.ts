import { PDI_COACHING_CATEGORY } from '@constants/pdi'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePdiCoachingInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PDI_COACHING_CATEGORY)
  category?: PDI_COACHING_CATEGORY

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  action?: string
}
