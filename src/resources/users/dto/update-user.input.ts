import { InputType, Field, Int } from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator'
import { ROLES } from '@constants/roles'

@InputType()
export class UpdateUserInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  manager?: number

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  department?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  confirmed?: boolean

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  deleted?: boolean
}
