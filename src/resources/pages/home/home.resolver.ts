import { ROLES } from '@constants/roles'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateHomeInput } from '@pages/home/dto/create-home.input'
import { UpdateHomeInput } from '@pages/home/dto/update-home.input'
import { HomeModel } from '@pages/home/entities/home.entity'
import { HomeService } from '@pages/home/home.service'

@Resolver(() => HomeModel)
export class HomeResolver {
  constructor(@Inject(HomeService) private readonly service: HomeService) {}

  @Query(() => HomeModel, { name: 'homePage' })
  async get(): Promise<HomeModel> {
    return await this.service.get()
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @Mutation(() => HomeModel)
  async createHome(@Args('input') input: CreateHomeInput): Promise<HomeModel> {
    return await this.service.create(input)
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @Mutation(() => HomeModel)
  async updateHome(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateHomeInput
  ): Promise<HomeModel> {
    return await this.service.update(id, input)
  }
}
