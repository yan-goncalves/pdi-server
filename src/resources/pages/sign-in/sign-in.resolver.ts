import { ROLES } from '@constants/roles'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSignInInput } from '@pages/sign-in/dto/create-sign-in.input'
import { UpdateSignInInput } from '@pages/sign-in/dto/update-sign-in.input'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'
import { SignInService } from '@pages/sign-in/sign-in.service'

@Resolver(() => SignInModel)
export class SignInResolver {
  constructor(@Inject(SignInService) private readonly service: SignInService) {}

  @Query(() => SignInModel, { name: 'signInPage' })
  async get(): Promise<SignInModel> {
    return await this.service.get()
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @Mutation(() => SignInModel)
  async createSignIn(@Args('input') input: CreateSignInInput): Promise<SignInModel> {
    return await this.service.create(input)
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @Mutation(() => SignInModel)
  async updateSignIn(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateSignInInput
  ): Promise<SignInModel> {
    return await this.service.update(id, input)
  }
}
