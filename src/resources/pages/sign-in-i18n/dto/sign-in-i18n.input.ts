import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class SignInI18nInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  caption: string

  @Field({ nullable: true, defaultValue: LOCALES.BR })
  @IsOptional()
  @IsEnum(LOCALES)
  locale?: LOCALES
}
