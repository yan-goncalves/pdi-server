import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { CreatePdiCompetenceCategoryInput } from '@pdi-competences-categories/dto/create-pdi-competence-category.input'

@InputType()
export class UpdatePdiCompetenceCategoryInput extends CreatePdiCompetenceCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
