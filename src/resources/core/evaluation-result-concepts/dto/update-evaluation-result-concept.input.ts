import { LOCALES } from '@constants/locales'
import { CreateEvaluationResultConceptInput } from '@evaluation-result-concepts/dto/create-evaluation-result-concept.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateEvaluationResultConceptInput extends PartialType(
  CreateEvaluationResultConceptInput
) {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
