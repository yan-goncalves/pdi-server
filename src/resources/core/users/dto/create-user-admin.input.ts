import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserAdminInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string
}
