import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

@InputType()
export class GetUserInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  id?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  loadRelations?: boolean
}
