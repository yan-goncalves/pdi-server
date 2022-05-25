import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PdiCompetenceCategoryI18nInput } from '@pdi-competences-categories-i18n/dto/pdi-competence-category-i18n.input'
import { PdiCompetenceCategoryLocaleModel } from '@pdi-competences-categories-i18n/entities/pdi-competence-category-i18n.entity'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PdiCompetencesCategoriesI18nService {
  constructor(
    @InjectRepository(PdiCompetenceCategoryLocaleModel)
    private readonly repo: Repository<PdiCompetenceCategoryLocaleModel>
  ) {}

  async get(id: number): Promise<PdiCompetenceCategoryLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Pdi competence category not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PdiCompetenceCategoryLocaleModel> | FindOptionsWhere<PdiCompetenceCategoryLocaleModel>[]
  ): Promise<PdiCompetenceCategoryLocaleModel> {
      return await this.repo.findOneBy(options)
  }

  async create(
    pdiCompetenceCategory: PdiCompetenceCategoryModel,
    { locale = LOCALES.BR, ...input }: PdiCompetenceCategoryI18nInput
  ): Promise<PdiCompetenceCategoryLocaleModel> {
    return await this.repo.save(this.repo.create({ pdiCompetenceCategory, locale, ...input }))
  }

  async update(
    pdiCompetenceCategory: PdiCompetenceCategoryModel,
    { locale = LOCALES.BR, ...input }: PdiCompetenceCategoryI18nInput
  ): Promise<PdiCompetenceCategoryLocaleModel> {
    const pdiCompetenceCategoryLocale = await this.getBy({ pdiCompetenceCategory: { id: pdiCompetenceCategory.id }, locale })
    this.repo.merge(pdiCompetenceCategoryLocale, { ...input })
    return await this.repo.save(pdiCompetenceCategoryLocale)
  }
}
