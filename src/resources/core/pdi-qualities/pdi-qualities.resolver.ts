import { ROLES } from '@constants/roles'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiQualityInput } from '@pdi-qualities/dto/create-pdi-quality.input'
import { UpdatePdiQualityInput } from '@pdi-qualities/dto/update-pdi-quality.input'
import { PdiQualityModel } from '@pdi-qualities/entities/pdi-quality.entity'
import { PdiQualitiesService } from '@pdi-qualities/pdi-qualities.service'
import { UserModel } from '@users/entities/user.entity'

@Resolver(() => PdiQualityModel)
export class PdiQualitiesResolver {
  constructor(@Inject(PdiQualitiesService) private readonly service: PdiQualitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => PdiQualityModel, { name: 'pdiQuality' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiQualityModel> {
    return await this.service.get(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [PdiQualityModel], { name: 'pdiQualities' })
  async list(): Promise<PdiQualityModel[]> {
    return await this.service.list()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiQualityModel)
  async createPdiQuality(
    @CurrentUser() manager: UserModel,
    @Args('input') input: CreatePdiQualityInput
  ): Promise<PdiQualityModel> {
    return await this.service.create(manager.id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiQualityModel)
  async updatePdiQuality(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiQualityInput
  ): Promise<PdiQualityModel> {
    return await this.service.update(manager.id, id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiQualityModel)
  async removePdiQuality(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<PdiQualityModel> {
    return await this.service.delete(manager.id, id)
  }
}
