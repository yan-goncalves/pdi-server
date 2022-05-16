import { EntityFindOptions } from '@constants/common'
import { LOCALES } from '@constants/locales'
import {
  ConflictException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QuestionModel } from '@questions/entities/question.entity'
import { QuestionsService } from '@questions/questions.service'
import { SectionsI18nService } from '@sections-i18n/sections-i18n.service'
import { CreateSectionInput } from '@sections/dto/create-section.input'
import { UpdateSectionInput } from '@sections/dto/update-section.input'
import { SectionModel } from '@sections/entities/section.entity'
import { SkillModel } from '@skills/entities/skill.entity'
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

  private isInSection<T extends { id: number }>(
    array: T[],
    section: SectionModel,
    field: 'questions' | 'skills'
  ): Array<T> {
    return array.filter((item) =>
      section[field].some((sectionItem: QuestionModel | SkillModel) => sectionItem.id === item.id)
    )
  }

  async list(options?: EntityFindOptions<SectionModel>): Promise<SectionModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}
    const questions = await this.questionsService.list({ locale })
    const skills = await this.skillsService.list({ locale })

    const sections = await this.repo.find({ relations })

    const mappedSections = sections.map(async (section) => ({
      ...section,
      title: await this.i18nService
        .getBy({
          section: { id: section.id },
          locale
        })
        .then((sectionLocale) => sectionLocale?.title || null),
      questions: this.isInSection(questions, section, 'questions'),
      skills: this.isInSection(skills, section, 'skills')
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
    { title, visibility, locale = LOCALES.BR }: UpdateSectionInput
  ): Promise<SectionModel> {
    const section = await this.get(id, locale)

    if (visibility) {
      this.repo.merge(section, { visibility })
      await this.repo.save(section)
    }

    if (section?.title && section.title === title) {
      return section
    }

    const sectionLocale = !section?.title
      ? await this.i18nService.create(section, { title, locale })
      : await this.i18nService.update(section, { title, locale })

    const ret = { ...section, title: sectionLocale.title }

    return !visibility ? ret : { ...ret, visibility }
  }

  async addQuestion(id: number, idQuestion: number): Promise<boolean> {
    const section = await this.get(id)
    const question = await this.questionsService.get(idQuestion)

    if (section?.questions.some((q) => q.id === question.id)) {
      throw new MethodNotAllowedException('Question already exist on this Section')
    }

    const merge = {
      ...section,
      questions: [{ ...question, ask: question.ask }]
    }
    this.repo.merge(section, merge)

    return !!(await this.repo.save(section))
  }

  async addSkill(id: number, idSkill: number): Promise<boolean> {
    const section = await this.get(id)
    const skill = await this.skillsService.get(idSkill)

    if (section?.skills.some((s) => s.id === skill.id)) {
      throw new MethodNotAllowedException('Skill already exist on this Section')
    }

    const merge = {
      ...section,
      skills: [{ ...skill, title: skill.title, description: skill.description }]
    }

    this.repo.merge(section, merge)
    return !!(await this.repo.save(section))
  }
}
