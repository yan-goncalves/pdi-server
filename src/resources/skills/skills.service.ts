import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SkillsI18nService } from '@skills-i18n/skills-i18n.service'
import { CreateSkillInput } from '@skills/dto/create-skill.input'
import { UpdateSkillInput } from '@skills/dto/update-skill.input'
import { SkillModel } from '@skills/entities/skill.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillModel) private readonly repo: Repository<SkillModel>,
    @Inject(SkillsI18nService) private readonly i18nService: SkillsI18nService
  ) {}

  async get(id: number): Promise<SkillModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`Skill with id '${id} not found`)
    }
  }

  async list(): Promise<SkillModel[]> {
    return await this.repo.find()
  }

  async create({ title, description }: CreateSkillInput): Promise<SkillModel> {
    if (await this.i18nService.getBy({ description })) {
      throw new ConflictException('Skill description already exists')
    }

    const skill = await this.repo.save(this.repo.create())
    const skillLocale = await this.i18nService.create(skill, { title, description })

    return {
      ...skill,
      title: skillLocale.title,
      description: skillLocale.description
    }
  }

  async update(
    id: number,
    { title, description, locale = LOCALES.BR }: UpdateSkillInput
  ): Promise<SkillModel> {
    const skill = await this.get(id)
    const skillLocaleFound = await this.i18nService.getBy({ skill: { id }, locale })

    if (
      (skillLocaleFound?.title && skillLocaleFound.title === title) ||
      (skillLocaleFound?.description && skillLocaleFound.description === description)
    ) {
      return {
        ...skill,
        title: skillLocaleFound.title,
        description: skillLocaleFound.description
      }
    }

    const skillLocale =
      !skillLocaleFound?.title && !skillLocaleFound?.description
        ? await this.i18nService.create(skill, { title, description, locale })
        : await this.i18nService.update(skill, { title, description, locale })

    return {
      ...skill,
      title: skillLocale.title,
      description: skillLocale.description
    }
  }
}
