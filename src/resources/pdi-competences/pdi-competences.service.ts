import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PdiCompetencesCategoriesService } from '@pdi-competences-categories/pdi-competences-categories.service'
import { CreatePdiCompetenceInput } from '@pdi-competences/dto/create-pdi-competence.input'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UpdatePdiCompetenceInput } from './dto/update-pdi-competence.input'
import { PdiCompetenceModel } from './entities/pdi-competence.entity'

@Injectable()
export class PdiCompetencesService {
  constructor(
    @InjectRepository(PdiCompetenceModel)
    private readonly repo: Repository<PdiCompetenceModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(PerformedEvaluationsService)
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
    action
  }: CreatePdiCompetenceInput): Promise<PdiCompetenceModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const category = await this.categoryService.get(idCategory)
      return await this.repo.save(this.repo.create({ performed, category, action }))
    } catch (Error) {
      if (Error instanceof NotFoundException) {
        throw Error
      }
      throw new ConflictException('PdiCompetence already exists')
    }
  }

  async update(
    id: number,
    { idCategory, action }: UpdatePdiCompetenceInput
  ): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.get(id)
    const category = await this.categoryService.get(idCategory)
    this.repo.merge(pdiCompetenceFound, { category, action })
    return await this.repo.save(pdiCompetenceFound)
  }

  async delete(id: number): Promise<PdiCompetenceModel> {
    const pdiCompetenceFound = await this.get(id)
    await this.repo.delete({ id: pdiCompetenceFound.id })

    return pdiCompetenceFound
  }
}
