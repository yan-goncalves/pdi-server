import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreatePdicompetencyInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field()
  @IsNotEmpty()
  @IsEnum(PDI_COMPETENCE_CATEGORY)
  category: PDI_COMPETENCE_CATEGORY

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  action: string
}
