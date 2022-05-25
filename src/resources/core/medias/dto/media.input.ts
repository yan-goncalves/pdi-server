import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class MediaInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  filename: string
}
