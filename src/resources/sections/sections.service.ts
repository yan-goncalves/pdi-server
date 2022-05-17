import { LOCALES } from '@constants/locales'
import {
  ConflictException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QuestionsService } from '@questions/questions.service'
import { SectionsI18nService } from '@sections-i18n/sections-i18n.service'
import { CreateSectionInput } from '@sections/dto/create-section.input'
import { UpdateSectionInput } from '@sections/dto/update-section.input'
import { SectionModel } from '@sections/entities/section.entity'
import { SkillsService } from '@skills/skills.service'
import { Repository } from 'typeorm'

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(SectionModel) private readonly repo: Repository<SectionModel>,
    @Inject(SectionsI18nService) private readonly i18nService: SectionsI18nService,
    @Inject(QuestionsService) private readonly questionsService: QuestionsService,
    @Inject(SkillsService) private readonly skillsService: SkillsService
  ) {}

  async get(id: number): Promise<SectionModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`Section with id '${id} not found`)
    }
  }

  async list(): Promise<SectionModel[]> {
    return await this.repo.find()
  }

  async create({ title, visibility }: CreateSectionInput): Promise<SectionModel> {
    if (await this.i18nService.getBy({ title })) {
      throw new ConflictException('Section title already exists')
    }

    const section = await this.repo.save(this.repo.create({ visibility }))
    const sectionLocale = await this.i18nService.create(section, { title })

    return {
      ...section,
      title: sectionLocale.title
    }
  }

  async update(
    id: number,
    { title, visibility, locale = LOCALES.BR }: UpdateSectionInput
  ): Promise<SectionModel> {
    const section = await this.get(id)
    const sectionLocaleFound = await this.i18nService.getBy({ section: { id }, locale })

    if (visibility) {
      this.repo.merge(section, { visibility })
      await this.repo.save(section)
    }

    if (sectionLocaleFound?.title && sectionLocaleFound.title === title) {
      return {
        ...section,
        title: sectionLocaleFound.title
      }
    }

    const sectionLocale = !section?.title
      ? await this.i18nService.create(section, { title, locale })
      : await this.i18nService.update(section, { title, locale })

    const ret = { ...section, title: sectionLocale.title }

    return !visibility ? ret : { ...ret, visibility }
  }

  async addQuestion(id: number, idQuestion: number): Promise<SectionModel> {
    const section = await this.get(id)
    const question = await this.questionsService.get(idQuestion)

    if (section?.questions.some((q) => q.id === question.id)) {
      throw new MethodNotAllowedException('Question already exist on this Section')
    }

    this.repo.merge(section, { questions: [question] })
    return await this.repo.save(section)
  }

  async addSkill(id: number, idSkill: number): Promise<SectionModel> {
    const section = await this.get(id)
    const skill = await this.skillsService.get(idSkill)

    if (section?.skills.some((s) => s.id === skill.id)) {
      throw new MethodNotAllowedException('Skill already exist on this Section')
    }

    this.repo.merge(section, { skills: [skill] })
    return await this.repo.save(section)
  }
}
