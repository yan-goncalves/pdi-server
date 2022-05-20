import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class ButtonI18nInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  label: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  loadingLabel?: string

  @Field({ nullable: true, defaultValue: LOCALES.BR })
  @IsOptional()
  @IsEnum(LOCALES)
  locale?: LOCALES
}
