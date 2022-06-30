import { ROLES } from '@constants/roles'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Field, ObjectType } from '@nestjs/graphql'
import { PassportStrategy } from '@nestjs/passport'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'

export type JwtPayload = {
  sub: number
  username: string
  email: string
  role: ROLES
}

@ObjectType()
export class JWT {
  @Field()
  jwt: string
  @Field()
  user: UserModel
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false
    })
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    try {
      return await this.userService.get({ id: payload.sub })
    } catch {
      throw new UnauthorizedException()
    }
  }
}
