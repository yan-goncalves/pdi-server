import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty } from 'class-validator'

@InputType()
export class VisibilitySectionInput {
  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  USER: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  MANAGER: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  COORDINATOR: string

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  DIRECTOR: string
}
