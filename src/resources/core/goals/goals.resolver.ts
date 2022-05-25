import { ROLES } from '@constants/roles'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Roles } from '@decorators/roles.decorator'
import { GoalInput } from '@goals/dto/goal.input'
import { GoalModel } from '@goals/entities/goal.entity'
import { GoalsService } from '@goals/goals.service'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'

@Resolver(() => GoalModel)
export class GoalsResolver {
  constructor(@Inject(GoalsService) private readonly service: GoalsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Query(() => GoalModel, { name: 'goal' })
  async get(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('loadRelations', { type: () => Boolean, defaultValue: false }) loadRelations: boolean
  ): Promise<GoalModel> {
    return await this.service.get(id, idManager, loadRelations)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Query(() => [GoalModel], { name: 'goals' })
  async list(@CurrentUser() { id, role }: UserModel): Promise<GoalModel[]> {
    return await this.service.list(id, role === ROLES.DIRECTOR)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => GoalModel)
  async createGoal(
    @CurrentUser() { id }: UserModel,
    @Args('input') input: GoalInput
  ): Promise<GoalModel> {
    return await this.service.create(id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => GoalModel)
  async updateGoal(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: GoalInput
  ): Promise<GoalModel> {
    return await this.service.update(id, idManager, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => GoalModel)
  async removeGoal(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<GoalModel> {
    return await this.service.setDeleted(id, idManager)
  }
}
