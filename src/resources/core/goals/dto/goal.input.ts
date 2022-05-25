import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GoalInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string
}
