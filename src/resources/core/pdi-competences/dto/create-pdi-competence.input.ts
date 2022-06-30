import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreatePdiCompetenceInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idPerformed: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  idCategory: number

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  action: string

  @Field()
  @IsNotEmpty()
  @IsDate()
  deadline: Date
}
