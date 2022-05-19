import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateRatingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  value: number
}
