import { EntityFindOptions } from '@constants/common'
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

  async get(id: number, locale = LOCALES.BR): Promise<SkillModel> {
    const skills = await this.repo.findOneBy({ id })
    if (!skills) {
      throw new NotFoundException(`Skill with id '${id} not found`)
    }

    const skillsLocale = await this.i18nService.getBy({
      skills: { id: skills.id },
      locale
    })
    return { ...skills, changeMe: skillsLocale?.changeMe || null }
  }

  async list(options?: EntityFindOptions<SkillModel>): Promise<SkillModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}

    const skillss = await this.repo.find({ relations })
    const mappedskillss = skillss.map(async (skills) => ({
      ...skills,
      title: await this.i18nService
        .getBy({
          skills: { id: skills.id },
          locale
        })
        .then((skillsLocale) => skillsLocale?.changeMe || null)
    }))

    return await Promise.all(mappedskillss)
  }

  async create({ changeMe }: CreateSkillInput): Promise<SkillModel> {
    if (await this.i18nService.getBy({ changeMe })) {
      throw new ConflictException('skill already exists')
    }

    const skills = await this.repo.save(this.repo.create())
    const skillsLocale = await this.i18nService.create(skills, { changeMe })

    return { ...skills, changeMe: skillsLocale.changeMe }
  }

  async update(
    id: number,
    { changeMe, locale = LOCALES.BR }: UpdateSkillInput
  ): Promise<SkillModel> {
    const skills = await this.get(id, locale)
    if (skills?.changeMe && skills.changeMe === changeMe) {
      return skills
    }

    const skillsLocale = !skills?.changeMe
      ? await this.i18nService.create(skills, { changeMe, locale })
      : await this.i18nService.update(skills, { changeMe, locale })

    return { ...skills, changeMe: skillsLocale.changeMe }
  }
}
