import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  key: string

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string
}
