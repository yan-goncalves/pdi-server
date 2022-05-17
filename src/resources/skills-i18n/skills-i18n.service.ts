import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SkillI18nInput } from '@skills-i18n/dto/skill-i18n.input'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-18n.entity'
import { SkillModel } from '@skills/entities/skill.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class SkillsI18nService {
  constructor(
    @InjectRepository(SkillLocaleModel)
    private readonly repo: Repository<SkillLocaleModel>
  ) {}

  async get(id: number): Promise<SkillLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Skill not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<SkillLocaleModel> | FindOptionsWhere<SkillLocaleModel>[]
  ): Promise<SkillLocaleModel> {
    return await this.repo.findOneByOrFail(options)
  }

  async create(
    skill: SkillModel,
    { locale = LOCALES.BR, ...input }: SkillI18nInput
  ): Promise<SkillLocaleModel> {
    return await this.repo.save(this.repo.create({ skill, locale, ...input }))
  }

  async update(
    skill: SkillModel,
    { locale = LOCALES.BR, ...input }: SkillI18nInput
  ): Promise<SkillLocaleModel> {
    const skillLocale = await this.getBy({ skill: { id: skill.id }, locale })
    this.repo.merge(skillLocale, { ...input })
    return await this.repo.save(skillLocale)
  }
}
