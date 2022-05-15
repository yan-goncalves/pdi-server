import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInfoInput } from '@users-info/dto/create-user-info.input'
import { UpdateUserInfoInput } from '@users-info/dto/update-user-info.input'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { UsersInfoService } from '@users-info/users-info.service'

@Resolver(() => UsersInfoModel)
export class UsersInfoResolver {
  constructor(@Inject(UsersInfoService) private readonly service: UsersInfoService) {}

  @Query(() => UsersInfoModel, { name: 'usersInfo' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<UsersInfoModel> {
    return this.service.get(id)
  }

  @Mutation(() => UsersInfoModel)
  async createUsersInfo(
    @Args('id') idUser: number,
    @Args('input') input: CreateUserInfoInput
  ): Promise<UsersInfoModel> {
    return await this.service.create(idUser, input)
  }

  @Mutation(() => UsersInfoModel)
  async updateUsersInfo(
    @Args('id') id: number,
    @Args('input') input: UpdateUserInfoInput
  ): Promise<UsersInfoModel> {
    return await this.service.update(id, input)
  }

  @Mutation(() => UsersInfoModel)
  async removeUsersInfo(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return await this.service.remove(id)
  }
}
