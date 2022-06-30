import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class KpiInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsString()
  target: string

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  weight: number
}
