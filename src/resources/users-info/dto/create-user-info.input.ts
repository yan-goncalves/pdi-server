import { Field, InputType } from '@nestjs/graphql'
import { UpdateUserInfoInput } from '@users-info/dto/update-user-info.input'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateUserInfoInput extends UpdateUserInfoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsString()
  lastname: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  position?: string
}
