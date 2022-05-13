import { LOCALES } from '@constants/locales'
import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
