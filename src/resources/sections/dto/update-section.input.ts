import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { VisibilitySectionInput } from '@sections/dto/visibility-section.input'
import { VisibilityModel } from '@sections/entities/section.entity'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { CreateSectionInput } from './create-section.input'

@InputType()
export class UpdateSectionInput extends CreateSectionInput {
  @Field(() => VisibilitySectionInput, { nullable: true })
  @IsOptional()
  visibility: VisibilityModel

  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
