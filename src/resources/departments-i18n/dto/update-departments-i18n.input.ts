import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { LOCALES } from '@constants/locales'

@InputType()
export class UpdateDepartmentsI18nInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field({ nullable: true, defaultValue: LOCALES.BR })
  @IsOptional()
  @IsEnum(LOCALES)
  locale?: LOCALES
}
