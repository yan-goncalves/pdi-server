import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ROLES } from 'src/constants/roles'

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string

  @Field()
  @IsNotEmpty()
  @IsString()
  email: string

  @Field({ nullable: true, defaultValue: ROLES.USER })
  @IsOptional()
  @IsEnum(ROLES)
  role?: ROLES
}
