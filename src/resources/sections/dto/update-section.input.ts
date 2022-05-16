import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { VisibilitySectionInput } from '@sections/dto/visibility-section.input'
import { VisibilityModel } from '@sections/entities/section.entity'
import { IsEnum, IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateSectionInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string

  @Field(() => VisibilitySectionInput, { nullable: true })
  @IsOptional()
  visibility: VisibilityModel

  @Field({ nullable: true, defaultValue: LOCALES.BR })
  @IsOptional()
  @IsEnum(LOCALES)
  locale?: LOCALES
}
