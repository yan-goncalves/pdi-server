import { PDI_QUALITY_CATEGORY } from '@constants/pdi'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePdiQualityInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(PDI_QUALITY_CATEGORY)
  category?: PDI_QUALITY_CATEGORY

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string
}
