import { LOCALES } from '@constants/locales'
import { Field, InputType } from '@nestjs/graphql'
import { CreateSignInInput } from '@pages/sign-in/dto/create-sign-in.input'
import { IsEnum, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateSignInInput extends CreateSignInInput {
  @Field()
  @IsNotEmpty()
  @IsEnum(LOCALES)
  locale: LOCALES
}
