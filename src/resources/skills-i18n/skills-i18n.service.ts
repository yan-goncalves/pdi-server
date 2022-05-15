import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SkillI18nInput } from '@skills-i18n/dto/skill-i18n.input'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-i18n.entity'
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
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      return null
    }
  }

  async create(
    skills: SkillModel,
    { changeMe, locale = LOCALES.BR }: SkillI18nInput
  ): Promise<SkillLocaleModel> {
    return await this.repo.save(this.repo.create({ skills, changeMe, locale }))
  }

  async update(
    skills: SkillModel,
    { changeMe, locale = LOCALES.BR }: SkillI18nInput
  ): Promise<SkillLocaleModel> {
    const skillsLocale = await this.getBy({ skills: { id: skills.id }, locale })
    this.repo.merge(skillsLocale, { changeMe })
    return await this.repo.save(skillsLocale)
  }
}
