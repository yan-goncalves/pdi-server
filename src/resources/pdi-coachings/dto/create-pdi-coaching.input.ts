import { PDI_COACHING_CATEGORY } from '@constants/pdi'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreatePdiCoachingInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field()
  @IsNotEmpty()
  @IsEnum(PDI_COACHING_CATEGORY)
  category: PDI_COACHING_CATEGORY

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  action: string
}
