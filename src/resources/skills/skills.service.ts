import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SkillsI18nService } from '@skills-i18n/skills-i18n.service'
import { CreateSkillInput } from '@skills/dto/create-skill.input'
import { UpdateSkillInput } from '@skills/dto/update-skill.input'
import { SkillModel } from '@skills/entities/skill.entity'
import { EntityFindOptions } from 'src/types/common'
import { Repository } from 'typeorm'

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillModel) private readonly repo: Repository<SkillModel>,
    @Inject(SkillsI18nService) private readonly i18nService: SkillsI18nService
  ) {}

  async get(id: number, locale = LOCALES.BR): Promise<SkillModel> {
    const skill = await this.repo.findOneBy({ id })
    if (!skill) {
      throw new NotFoundException(`Skill with id '${id} not found`)
    }

    const skillLocale = await this.i18nService.getBy({
      skill: { id: skill.id },
      locale
    })
    return {
      ...skill,
      title: skillLocale?.title || null,
      description: skillLocale?.description || null
    }
  }

  async list(options?: EntityFindOptions<SkillModel>): Promise<SkillModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}

    const getSkillLocale = async (
      skill: SkillModel
    ): Promise<Pick<SkillModel, 'title' | 'description'>> => {
      const skillLocale = await this.i18nService.getBy({
        skill: { id: skill.id },
        locale
      })

      return { title: skillLocale?.title || null, description: skillLocale?.description || null }
    }

    const skills = await this.repo.find({ relations })
    const mappedSkills = skills.map(async (skill) => ({
      ...skill,
      ...(await getSkillLocale(skill))
    }))

    return await Promise.all(mappedSkills)
  }

  async create({ title, description }: CreateSkillInput): Promise<SkillModel> {
    if (await this.i18nService.getBy({ description })) {
      throw new ConflictException('Skill description already exists')
    }

    const skill = await this.repo.save(this.repo.create())
    const skillLocale = await this.i18nService.create(skill, { title, description })

    return { ...skill, title: skillLocale.title, description: skillLocale.description }
  }

  async update(
    id: number,
    { title, description, locale = LOCALES.BR }: UpdateSkillInput
  ): Promise<SkillModel> {
    const skill = await this.get(id, locale)
    if (
      (skill?.title && skill.title === title) ||
      (skill?.description && skill.description === description)
    ) {
      return skill
    }

    const skillLocale =
      !skill?.title && !skill?.description
        ? await this.i18nService.create(skill, { title, description, locale })
        : await this.i18nService.update(skill, { title, description, locale })

    return { ...skill, title: skillLocale.title, description: skillLocale.description }
  }
}
