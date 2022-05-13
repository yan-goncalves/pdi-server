import { LOCALES } from '@constants/locales'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateDepartmentsI18nInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field({ nullable: true, defaultValue: LOCALES.BR })
  @IsOptional()
  @IsEnum(LOCALES)
  locale?: LOCALES
}
