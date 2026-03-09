import { UsersService } from '@core/users/users.service'
import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PdiCompetencesCategoriesService } from '@pdi-competences-categories/pdi-competences-categories.service'
import { CreatePdiCompetenceInput } from '@pdi-competences/dto/create-pdi-competence.input'
import { UpdatePdiCompetenceInput } from '@pdi-competences/dto/update-pdi-competence.input'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PdiCompetencesService {
  constructor(
    @InjectRepository(PdiCompetenceModel)
    private readonly repo: Repository<PdiCompetenceModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(PdiCompetencesCategoriesService)
    private readonly categoryService: PdiCompetencesCategoriesService,
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async get(id: number): Promise<PdiCompetenceModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PdiCompetence not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PdiCompetenceModel> | FindOptionsWhere<PdiCompetenceModel>[]
  ): Promise<PdiCompetenceModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PdiCompetence not found')
    }
  }

  async list(): Promise<PdiCompetenceModel[]> {
    return await this.repo.find()
  }

  async create(
    idManager: number,
    {
      idPerformed,
      idCategory,
      name,
      action,
      deadline
    }: CreatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    try {
      const performed = await this.performedService.get(idPerformed, { loadRelations: true })
      const performedUser = await this.usersService.get({ id: performed.user.id }, { loadRelations: true })

      // Verify if manager is the direct manager of the user
      if (performedUser.manager?.id !== idManager) {
        throw new ForbiddenException('You can only manage PDI for your direct reports')
      }

      const category = await this.categoryService.get(idCategory)
      return await this.repo.save(this.repo.create({ performed, category, name, action, deadline }))
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error
      }

      throw new ConflictException('PdiCompetence already exists')
    }
  }

  async update(
    idManager: number,
    id: number,
    { idCategory, name, action, deadline }: UpdatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiCompetenceFound) {
      throw new NotFoundException('PdiCompetence not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiCompetenceFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    const category = await this.categoryService.get(idCategory)
    this.repo.merge(pdiCompetenceFound, { category, name, action, deadline })
    return await this.repo.save(pdiCompetenceFound)
  }

  async delete(idManager: number, id: number): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiCompetenceFound) {
      throw new NotFoundException('PdiCompetence not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiCompetenceFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    await this.repo.delete({ id: pdiCompetenceFound.id })

    return pdiCompetenceFound
  }
}
