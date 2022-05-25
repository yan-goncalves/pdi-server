import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SectionsI18nInput } from '@sections-i18n/dto/section-i18n.input'
import { SectionLocaleModel } from '@sections-i18n/entities/sections-i18n.entity'
import { SectionModel } from '@sections/entities/section.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class SectionsI18nService {
  constructor(
    @InjectRepository(SectionLocaleModel)
    private readonly repo: Repository<SectionLocaleModel>
  ) {}

  async get(id: number): Promise<SectionLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Section locale not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<SectionLocaleModel> | FindOptionsWhere<SectionLocaleModel>[]
  ): Promise<SectionLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  async create(
    section: SectionModel,
    { title, locale = LOCALES.BR }: SectionsI18nInput
  ): Promise<SectionLocaleModel> {
    return await this.repo.save(this.repo.create({ section, title, locale }))
  }

  async update(
    section: SectionModel,
    { title, locale = LOCALES.BR }: SectionsI18nInput
  ): Promise<SectionLocaleModel> {
    const sectionLocale = await this.getBy({ section: { id: section.id }, locale })
    this.repo.merge(sectionLocale, { title })
    return await this.repo.save(sectionLocale)
  }
}
