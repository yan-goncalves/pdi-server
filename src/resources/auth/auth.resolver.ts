import { Inject } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { JWT } from 'src/strategies/jwt.strategy'
import { AuthService } from './auth.service'
import { SignInInput } from './dto/signin.auth.input'

@Resolver()
export default class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => JWT)
  async signin(@Args('input') input: SignInInput): Promise<JWT> {
    return await this.authService.signin(input)
  }
}
