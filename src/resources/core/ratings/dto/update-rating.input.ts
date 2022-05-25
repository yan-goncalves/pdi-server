import { LOCALES } from '@constants/locales'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateRatingInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  value?: number

  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
