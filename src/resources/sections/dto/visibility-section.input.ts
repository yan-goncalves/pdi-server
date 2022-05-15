import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty } from 'class-validator'

@InputType()
export class VisibilitySectionInput {
  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  User: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  Manager: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  Coordinator: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  Director: string
}
