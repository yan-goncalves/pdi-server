import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class SignInInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  identifier: string

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string
}
