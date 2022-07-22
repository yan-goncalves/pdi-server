import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePdiCompetenceInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  idCategory?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  action?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deadline?: Date
}
