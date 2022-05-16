import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty } from 'class-validator'

@InputType()
export class VisibilitySectionInput {
  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  user: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  manager: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  coordinator: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  director: string
}
