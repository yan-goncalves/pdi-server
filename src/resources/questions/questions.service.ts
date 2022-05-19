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

  async get(id: number): Promise<QuestionModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`Question with id '${id} not found`)
    }
  }

  async list(): Promise<QuestionModel[]> {
    return await this.repo.find()
  }

  async create({ ask, ...input }: CreateQuestionInput): Promise<QuestionModel> {
    if (await this.i18nService.getBy({ ask })) {
      throw new ConflictException('Question already exists')
    }

    const question = await this.repo.save(this.repo.create({ ...input }))
    const questionLocale = await this.i18nService.create(question, { ask })

    return {
      ...question,
      ask: questionLocale.ask
    }
  }

  async update(
    id: number,
    { ask, locale = LOCALES.BR }: UpdateQuestionInput
  ): Promise<QuestionModel> {
    const question = await this.get(id)
    const questionLocaleFound = await this.i18nService.getBy({ question: { id }, locale })
    if (questionLocaleFound?.ask && questionLocaleFound.ask === ask) {
      return {
        ...question,
        ask: questionLocaleFound.ask
      }
    }

    const questionLocale = !questionLocaleFound?.ask
      ? await this.i18nService.create(question, { ask, locale })
      : await this.i18nService.update(question, { ask, locale })

    return {
      ...question,
      ask: questionLocale.ask
    }
  }
}
