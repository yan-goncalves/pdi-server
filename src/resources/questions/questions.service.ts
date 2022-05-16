import { EntityFindOptions } from '@constants/common'
import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QuestionsI18nService } from '@questions-i18n/questions-i18n.service'
import { CreateQuestionInput } from '@questions/dto/create-question.input'
import { UpdateQuestionInput } from '@questions/dto/update-question.input'
import { QuestionModel } from '@questions/entities/question.entity'
import { Repository } from 'typeorm'

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionModel) private readonly repo: Repository<QuestionModel>,
    @Inject(QuestionsI18nService) private readonly i18nService: QuestionsI18nService
  ) {}

  async get(id: number, locale = LOCALES.BR): Promise<QuestionModel> {
    const question = await this.repo.findOneBy({ id })
    if (!question) {
      throw new NotFoundException(`Question with id '${id} not found`)
    }

    const questionLocale = await this.i18nService.getBy({
      question: { id: question.id },
      locale
    })
    return { ...question, ask: questionLocale?.ask || null }
  }

  async list(options?: EntityFindOptions<QuestionModel>): Promise<QuestionModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}

    const questions = await this.repo.find({ relations })
    const mappedQuestions = questions.map(async (question) => ({
      ...question,
      ask: await this.i18nService
        .getBy({
          question: { id: question.id },
          locale
        })
        .then((questionLocale) => questionLocale?.ask || null)
    }))

    return await Promise.all(mappedQuestions)
  }

  async create({ ask }: CreateQuestionInput): Promise<QuestionModel> {
    if (await this.i18nService.getBy({ ask })) {
      throw new ConflictException('Question already exists')
    }

    const question = await this.repo.save(this.repo.create())
    const questionLocale = await this.i18nService.create(question, { ask })

    return { ...question, ask: questionLocale.ask }
  }

  async update(
    id: number,
    { ask, locale = LOCALES.BR }: UpdateQuestionInput
  ): Promise<QuestionModel> {
    const question = await this.get(id, locale)
    if (question?.ask && question.ask === ask) {
      return question
    }

    const questionLocale = !question?.ask
      ? await this.i18nService.create(question, { ask, locale })
      : await this.i18nService.update(question, { ask, locale })

    return { ...question, ask: questionLocale.ask }
  }
}
