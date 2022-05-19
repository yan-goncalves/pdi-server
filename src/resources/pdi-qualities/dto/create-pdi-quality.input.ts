import { PDI_QUALITY_CATEGORY } from '@constants/pdi'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreatePdiQualityInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field()
  @IsNotEmpty()
  @IsEnum(PDI_QUALITY_CATEGORY)
  category: PDI_QUALITY_CATEGORY

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string
}
