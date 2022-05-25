import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateSkillInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
