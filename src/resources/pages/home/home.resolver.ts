import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateHomeInput } from '@pages/home/dto/create-home.input'
import { UpdateHomeInput } from '@pages/home/dto/update-home.input'
import { HomeModel } from '@pages/home/entities/home.entity'
import { HomeService } from '@pages/home/home.service'

@Resolver(() => HomeModel)
export class HomeResolver {
  constructor(@Inject(HomeService) private readonly service: HomeService) {}

  @Query(() => HomeModel, { name: 'home' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<HomeModel> {
    return await this.service.get(id)
  }

  @Query(() => [HomeModel], { name: 'home' })
  async list(): Promise<HomeModel[]> {
    return await this.service.list()
  }

  @Mutation(() => HomeModel)
  async createHome(@Args('input') input: CreateHomeInput): Promise<HomeModel> {
    return await this.service.create(input)
  }

  @Mutation(() => HomeModel)
  async updateHome(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateHomeInput
  ): Promise<HomeModel> {
    return await this.service.update(id, input)
  }
}
