import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { CreateSkillInput } from '@skills/dto/create-skill.input'

@InputType()
export class UpdateSkillInput extends CreateSkillInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
