import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

@InputType()
export class UpdatePdiCompetenceInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  idCategory?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  action?: string

  @Field()
  @IsOptional()
  @IsDate()
  deadline?: Date
}
