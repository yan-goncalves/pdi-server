import { ROLES } from '@constants/roles'
import { CurrentUser } from '@decorators/current-user.decorator'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePdiCompetenceInput } from '@pdi-competences/dto/create-pdi-competence.input'
import { UpdatePdiCompetenceInput } from '@pdi-competences/dto/update-pdi-competence.input'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import { PdiCompetencesService } from '@pdi-competences/pdi-competences.service'
import { UserModel } from '@users/entities/user.entity'

@Resolver(() => PdiCompetenceModel)
export class PdiCompetencesResolver {
  constructor(@Inject(PdiCompetencesService) private readonly service: PdiCompetencesService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => PdiCompetenceModel, { name: 'pdiCompetence' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<PdiCompetenceModel> {
    return await this.service.get(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [PdiCompetenceModel], { name: 'pdiCompetences' })
  async list(): Promise<PdiCompetenceModel[]> {
    return await this.service.list()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCompetenceModel)
  async createPdiCompetence(
    @CurrentUser() manager: UserModel,
    @Args('input') input: CreatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    return await this.service.create(manager.id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCompetenceModel)
  async updatePdiCompetence(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    return await this.service.update(manager.id, id, input)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.MANAGER, ROLES.COORDINATOR, ROLES.DIRECTOR)
  @Mutation(() => PdiCompetenceModel)
  async removePdiCompetence(
    @CurrentUser() manager: UserModel,
    @Args('id', { type: () => Int }) id: number
  ): Promise<PdiCompetenceModel> {
    return await this.service.delete(manager.id, id)
  }
}
