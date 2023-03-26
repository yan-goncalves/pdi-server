import { SignInInput } from '@auth/dto/signin.auth.input'
import { LdapService } from '@core/ldap/ldap.service'
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT, JwtPayload } from '@strategies/jwt.strategy'
import { UsersService } from '@users/users.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(LdapService) private readonly ldapService: LdapService
  ) {}

  async signin({ identifier, password }: SignInInput): Promise<JWT> {
    await this.ldapService.auth({ username: identifier, password }).catch(() => {
      throw new BadRequestException('Username/email or password incorrect')
    })

    const user = await this.userService.get({ username: identifier }, { loadRelations: true })

    try {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }

      return {
        jwt: this.jwtService.sign(payload),
        user
      }
    } catch (error) {
      throw new ForbiddenException(`User blocked or not created yet`)
    }
  }
}
