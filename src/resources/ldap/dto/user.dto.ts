import { IsNotEmpty, IsString } from 'class-validator'

export class LDAPUser {
  @IsNotEmpty()
  @IsString()
  readonly username!: string

  @IsNotEmpty()
  @IsString()
  readonly password!: string
}
