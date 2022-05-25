import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserInfoInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  position?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  hiringDate?: Date

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  badge?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  costCenter?: number
}
