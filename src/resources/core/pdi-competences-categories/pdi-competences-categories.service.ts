import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePdiCompetenceCategoryInput } from '@pdi-competences-categories/dto/create-pdi-competence-category.input'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PdiCompetencesCategoriesService {
  constructor(
    @InjectRepository(PdiCompetenceCategoryModel)
    private readonly repo: Repository<PdiCompetenceCategoryModel>
  ) {}

  async get(id: number): Promise<PdiCompetenceCategoryModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`PdiCompetenceCategory with id '${id} not found`)
    }
  }

  async list(): Promise<PdiCompetenceCategoryModel[]> {
    return await this.repo.find()
  }

  async create({ name }: CreatePdiCompetenceCategoryInput): Promise<PdiCompetenceCategoryModel> {
    if (await this.repo.findOneBy({ name })) {
      throw new ConflictException('PdiCompetenceCategory already exists')
    }

    return await this.repo.save(this.repo.create({ name }))
  }

  async delete(id: number): Promise<PdiCompetenceCategoryModel> {
    const pdiCompetenceCategoryFound = await this.get(id)
    await this.repo.delete({ id: pdiCompetenceCategoryFound.id })

    return pdiCompetenceCategoryFound
  }
}
