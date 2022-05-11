import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UserModel } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { Inject } from '@nestjs/common'

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Query(() => UserModel, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<UserModel> {
    return this.service.get(id)
  }

  @Query(() => [UserModel], { name: 'users' })
  async findAll(): Promise<UserModel[]> {
    return this.service.list()
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserModel> {
    return await this.service.create(createUserInput)
  }

  @Mutation(() => UserModel)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return await this.service.delete(id)
  }
}
