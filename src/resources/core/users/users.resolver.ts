import { ROLES } from '@constants/roles'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserAdminInput } from '@users/dto/create-user-admin.input'
import { CreateUserInput } from '@users/dto/create-user.input'
import { GetUserInput } from '@users/dto/get-user.input'
import { UpdateUserInput } from '@users/dto/update-user.input'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'

export const UserModelReturnType = (): typeof UserModel => UserModel
export const UserModelReturnTypeArray = (): [typeof UserModel] => [UserModel]
export const UserModelReturnTypeArgs = (): typeof Int => Int

@Resolver(UserModelReturnType)
export class UsersResolver {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Query(UserModelReturnType)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() { id }: UserModel): Promise<UserModel> {
    return await this.get({ id })
  }
  @Query(UserModelReturnType, { name: 'user' })
  async get(@Args('input') { loadRelations, ...input }: GetUserInput): Promise<UserModel> {
    return await this.service.get(input, { loadRelations })
  }

  @UseGuards(JwtAuthGuard)
  @Query(UserModelReturnTypeArray, { name: 'users' })
  async list(): Promise<UserModel[]> {
    return await this.service.list()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Query(() => [UserModel])
  async team(
    @CurrentUser() user: UserModel,
    @Args('id', { type: () => Int, nullable: true }) id?: number
  ): Promise<UserModel[]> {
    return await this.service.team(id ?? user.id)
  }

  @Mutation(UserModelReturnType)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserModel> {
    return await this.service.create(input)
  }

  @Mutation(UserModelReturnType)
  async createUserAdmin(@Args('input') input: CreateUserAdminInput): Promise<UserModel> {
    return await this.service.createAdmin(input)
  }

  @Mutation(UserModelReturnType)
  async updateUser(
    @Args('id', { type: UserModelReturnTypeArgs }) id: number,
    @Args('input') input: UpdateUserInput
  ): Promise<UserModel> {
    return await this.service.update(id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(UserModelReturnType)
  async removeUser(@Args('id', { type: UserModelReturnTypeArgs }) id: number): Promise<UserModel> {
    return await this.service.setDeleted(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(UserModelReturnTypeArray)
  async populate(): Promise<UserModel[]> {
    return await this.service.populate()
  }
}
