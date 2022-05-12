import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersInfoService } from '@users-info/users-info.service'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { CreateUsersInfoInput } from './dto/create-users-info.input'
import { UpdateUsersInfoInput } from './dto/update-users-info.input'
import { Inject } from '@nestjs/common'

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
    @Args('createUsersInfoInput') createUsersInfoInput: CreateUsersInfoInput
  ): Promise<UsersInfoModel> {
    return await this.service.create(idUser, createUsersInfoInput)
  }

  @Mutation(() => UsersInfoModel)
  async updateUsersInfo(
    @Args('id') id: number,
    @Args('updateUsersInfoInput') updateUsersInfoInput: UpdateUsersInfoInput
  ): Promise<UsersInfoModel> {
    return await this.service.update(id, updateUsersInfoInput)
  }

  @Mutation(() => UsersInfoModel)
  async removeUsersInfo(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return await this.service.remove(id)
  }
}
