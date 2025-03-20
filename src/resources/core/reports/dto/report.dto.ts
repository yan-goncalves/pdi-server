import { LOCALES } from '@constants/locales'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

export class ReportDto {
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => Number)
  usersIds: number[]

  @IsNotEmpty()
  @IsNumber()
  evaluationId: number

  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
