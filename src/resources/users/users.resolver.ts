import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from '@users/users.service'
import { UserModel } from '@users/entities/user.entity'
import { CreateUserInput } from '@users/dto/create-user.input'
import { Inject } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { LOCALES } from '@constants/locales'

export const UserModelReturnType = (): typeof UserModel => UserModel
export const UserModelReturnTypeArray = (): [typeof UserModel] => [UserModel]
export const UserModelReturnTypeArgs = (): typeof Int => Int

@Resolver(UserModelReturnType)
export class UsersResolver {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Query(UserModelReturnType, { name: 'user' })
  async get(
    @Args('id', { type: UserModelReturnTypeArgs }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<UserModel> {
    return this.service.get(id, { locale })
  }

  @Query(UserModelReturnTypeArray, { name: 'users' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale: LOCALES
  ): Promise<UserModel[]> {
    return this.service.list(locale)
  }

  @Mutation(UserModelReturnType)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserModel> {
    return await this.service.create(input)
  }

  @Mutation(UserModelReturnType)
  async updateUser(
    @Args('id', { type: UserModelReturnTypeArgs }) id: number,
    @Args('input') input: UpdateUserInput
  ): Promise<UserModel> {
    return await this.service.update(id, input)
  }

  @Mutation(UserModelReturnType)
  async removeUser(@Args('id', { type: UserModelReturnTypeArgs }) id: number): Promise<UserModel> {
    return await this.service.setDeleted(id)
  }
}
