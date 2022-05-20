import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateButtonInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  label: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  loadingLabel?: string
}
