import { AuthService } from '@auth/auth.service'
import { SignInInput } from '@auth/dto/signin.auth.input'
import { Inject } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { JWT } from '@strategies/jwt.strategy'

@Resolver()
export class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => JWT)
  async signin(@Args('input') input: SignInInput): Promise<JWT> {
    return await this.authService.signin(input)
  }
}
