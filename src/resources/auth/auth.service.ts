import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT, JwtPayload } from 'src/strategies/jwt.strategy'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { SignInInput } from './dto/signin.auth.input'
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
    } catch (err) {
      throw err
    }

    try {
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role
      }

      return Promise.resolve({
        jwt: this.jwtService.sign(payload)
      })
    } catch (error) {
      throw new ForbiddenException(`User blocked or not created yet`)
    }
  }
}
