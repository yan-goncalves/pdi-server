import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from '@users/users.service'
import { UserModel } from '@users/entities/user.entity'
import { CreateUserInput } from '@users/dto/create-user.input'
import { Inject } from '@nestjs/common'

export const UserModelReturnType = (): typeof UserModel => UserModel
export const UserModelReturnTypeArray = (): [typeof UserModel] => [UserModel]
export const UserModelReturnTypeArgs = (): typeof Int => Int

@Resolver(UserModelReturnType)
export class UsersResolver {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Query(UserModelReturnType, { name: 'user' })
  async get(@Args('id', { type: UserModelReturnTypeArgs }) id: number): Promise<UserModel> {
    return this.service.get(id)
  }

  @Query(UserModelReturnTypeArray, { name: 'users' })
  async list(): Promise<UserModel[]> {
    return this.service.list()
  }

  @Mutation(UserModelReturnType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserModel> {
    return await this.service.create(createUserInput)
  }

  @Mutation(UserModelReturnType)
  async setUserConfirmed(
    @Args('id', { type: UserModelReturnTypeArgs }) id: number
  ): Promise<UserModel> {
    return await this.service.setConfirmed(id)
  }

  @Mutation(UserModelReturnType)
  async blockUser(@Args('id', { type: UserModelReturnTypeArgs }) id: number): Promise<UserModel> {
    return await this.service.block(id)
  }

  @Mutation(UserModelReturnType)
  async removeUser(@Args('id', { type: UserModelReturnTypeArgs }) id: number): Promise<UserModel> {
    return await this.service.delete(id)
  }
}
