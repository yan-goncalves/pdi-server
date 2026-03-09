import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiCoachingInput } from '@pdi-coachings/dto/create-pdi-coaching.input'
import { UpdatePdiCoachingInput } from '@pdi-coachings/dto/update-pdi-coaching.input'
import { PdiCoachingModel } from '@pdi-coachings/entities/pdi-coaching.entity'
import { PdiCoachingsService } from '@pdi-coachings/pdi-coachings.service'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { CurrentUser } from '@decorators/current-user.decorator'
import { UserModel } from '@users/entities/user.entity'
import { ROLES } from '@constants/roles'

@Resolver(() => PdiCoachingModel)
export class PdiCoachingsResolver {
  constructor(@Inject(PdiCoachingsService) private readonly service: PdiCoachingsService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => PdiCoachingModel, { name: 'pdiCoaching' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiCoachingModel> {
    return await this.service.get(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [PdiCoachingModel], { name: 'pdiCoachings' })
  async list(): Promise<PdiCoachingModel[]> {
    return await this.service.list()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCoachingModel)
  async createPdiCoaching(
    @CurrentUser() manager: UserModel,
    @Args('input') input: CreatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    return await this.service.create(manager.id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCoachingModel)
  async updatePdiCoaching(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    return await this.service.update(manager.id, id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCoachingModel)
  async removePdiCoaching(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<PdiCoachingModel> {
    return await this.service.delete(manager.id, id)
  }
}
