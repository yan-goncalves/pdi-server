import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PdiCompetencesCategoriesI18nService } from '@pdi-competences-categories-i18n/pdi-competences-categories-i18n.service'
import { CreatePdiCompetenceCategoryInput } from '@pdi-competences-categories/dto/create-pdi-competence-category.input'
import { UpdatePdiCompetenceCategoryInput } from '@pdi-competences-categories/dto/update-pdi-competence-category.input'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PdiCompetencesCategoriesService {
  constructor(
    @InjectRepository(PdiCompetenceCategoryModel)
    private readonly repo: Repository<PdiCompetenceCategoryModel>,
    @Inject(PdiCompetencesCategoriesI18nService)
    private readonly i18nService: PdiCompetencesCategoriesI18nService
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
    if (await this.i18nService.getBy({ name })) {
      throw new ConflictException('PdiCompetenceCategory already exists')
    }

    const pdiCompetenceCategory = await this.repo.save(this.repo.create())
    const pdiCompetenceCategoryLocale = await this.i18nService.create(pdiCompetenceCategory, {
      name
    })

    return {
      ...pdiCompetenceCategory,
      name: pdiCompetenceCategoryLocale.name
    }
  }

  async update(
    id: number,
    { name, locale = LOCALES.BR }: UpdatePdiCompetenceCategoryInput
  ): Promise<PdiCompetenceCategoryModel> {
    const pdiCompetenceCategory = await this.get(id)
    const pdiCompetenceCategoryLocaleFound = await this.i18nService.getBy({
      pdiCompetenceCategory: { id },
      locale
    })
    if (pdiCompetenceCategoryLocaleFound?.name && pdiCompetenceCategoryLocaleFound.name === name) {
      return {
        ...pdiCompetenceCategory,
        name: pdiCompetenceCategoryLocaleFound.name
      }
    }

    const pdiCompetenceCategoryLocale = !pdiCompetenceCategoryLocaleFound?.name
      ? await this.i18nService.create(pdiCompetenceCategory, { name, locale })
      : await this.i18nService.update(pdiCompetenceCategory, { name, locale })

    return {
      ...pdiCompetenceCategory,
      name: pdiCompetenceCategoryLocale.name
    }
  }
}
