import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { UpdateUsersInfoInput } from './update-users-info.input'

@InputType()
export class CreateUsersInfoInput extends UpdateUsersInfoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsString()
  lastname: string
}
