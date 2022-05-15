import { EntityFindOptions } from '@constants/common'
import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SectionsI18nService } from '@sections-i18n/sections-i18n.service'
import { CreateSectionInput } from '@sections/dto/create-section.input'
import { UpdateSectionInput } from '@sections/dto/update-section.input'
import { SectionModel } from '@sections/entities/section.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionModel) private readonly repo: Repository<SectionModel>,
    @Inject(SectionsI18nService) private readonly i18nService: SectionsI18nService
  ) {}

  async get(id: number, locale = LOCALES.BR): Promise<SectionModel> {
    const section = await this.repo.findOneBy({ id })
    if (!section) {
      throw new NotFoundException(`Section with id '${id} not found`)
    }

    const sectionLocale = await this.i18nService.getBy({
      section: { id: section.id },
      locale
    })
    return { ...section, title: sectionLocale?.title || null }
  }

  async list(options?: EntityFindOptions<SectionModel>): Promise<SectionModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}

    const sections = await this.repo.find({ relations })
    const mappedSections = sections.map(async (section) => ({
      ...section,
      title: await this.i18nService
        .getBy({
          section: { id: section.id },
          locale
        })
        .then((sectionLocale) => sectionLocale?.title || null)
    }))

    return await Promise.all(mappedSections)
  }

  async create({ title, visibility }: CreateSectionInput): Promise<SectionModel> {
    if (await this.i18nService.getBy({ title })) {
      throw new ConflictException('Section title already exists')
    }

    const section = await this.repo.save(this.repo.create({ visibility }))
    const sectionLocale = await this.i18nService.create(section, { title })

    return { ...section, title: sectionLocale.title }
  }

  async update(
    id: number,
    { title, locale = LOCALES.BR }: UpdateSectionInput
  ): Promise<SectionModel> {
    const section = await this.get(id, locale)
    if (section?.title && section.title === title) {
      return section
    }

    const sectionLocale = !section?.title
      ? await this.i18nService.create(section, { title, locale })
      : await this.i18nService.update(section, { title, locale })

    return { ...section, title: sectionLocale.title }
  }
}
