import { SignInInput } from '@auth/dto/signin.auth.input'
import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT, JwtPayload } from '@strategies/jwt.strategy'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  async signin({ identifier, password }: SignInInput): Promise<JWT> {
    let user: UserModel
    try {
      user = await this.userService.validate(identifier, password)
    } catch (error) {
      throw error
    }

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
