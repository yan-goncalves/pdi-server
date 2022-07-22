import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
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
    private readonly categoryService: PdiCompetencesCategoriesService
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

  async create({
    idPerformed,
    idCategory,
    name,
    action,
    deadline
  }: CreatePdiCompetenceInput): Promise<PdiCompetenceModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const category = await this.categoryService.get(idCategory)
      return await this.repo.save(this.repo.create({ performed, category, name, action, deadline }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      throw new ConflictException('PdiCompetence already exists')
    }
  }

  async update(
    id: number,
    { idCategory, name, action, deadline }: UpdatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.get(id)
    const category = await this.categoryService.get(idCategory)
    this.repo.merge(pdiCompetenceFound, { category, name, action, deadline })
    return await this.repo.save(pdiCompetenceFound)
  }

  async delete(id: number): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.get(id)
    await this.repo.delete({ id: pdiCompetenceFound.id })

    return pdiCompetenceFound
  }
}
