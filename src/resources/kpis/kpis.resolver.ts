import { ROLES } from '@constants/roles'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { KpiInput } from '@kpis/dto/kpi.input'
import { KpiModel } from '@kpis/entities/kpi.entity'
import { KpisService } from '@kpis/kpis.service'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'

@Resolver(() => KpiModel)
export class KpisResolver {
  constructor(@Inject(KpisService) private readonly service: KpisService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Query(() => KpiModel, { name: 'kpi' })
  async get(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<KpiModel> {
    return await this.service.get(id, idManager)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Query(() => [KpiModel], { name: 'kpis' })
  async list(@CurrentUser() { id, role }: UserModel): Promise<KpiModel[]> {
    return await this.service.list(id, role === ROLES.DIRECTOR)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => KpiModel)
  async createKpi(
    @CurrentUser() { id }: UserModel,
    @Args('input') input: KpiInput
  ): Promise<KpiModel> {
    return await this.service.create(id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => KpiModel)
  async updateKpi(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: KpiInput
  ): Promise<KpiModel> {
    return await this.service.update(id, idManager, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => KpiModel)
  async removeKpi(
    @CurrentUser() { id: idManager }: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<KpiModel> {
    return await this.service.setDeleted(id, idManager)
  }
}
