import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QuestionI18nInput } from '@questions-i18n/dto/question-i18n.input'
import { QuestionLocaleModel } from '@questions-i18n/entities/questions-i18n.entity'
import { QuestionModel } from '@questions/entities/question.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class QuestionsI18nService {
  constructor(
    @InjectRepository(QuestionLocaleModel)
    private readonly repo: Repository<QuestionLocaleModel>
  ) {}

  async get(id: number): Promise<QuestionLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('question locale not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<QuestionLocaleModel> | FindOptionsWhere<QuestionLocaleModel>[]
  ): Promise<QuestionLocaleModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      return null
    }
  }

  async create(
    question: QuestionModel,
    { ask, locale = LOCALES.BR }: QuestionI18nInput
  ): Promise<QuestionLocaleModel> {
    return await this.repo.save(this.repo.create({ question, ask, locale }))
  }

  async update(
    question: QuestionModel,
    { ask, locale = LOCALES.BR }: QuestionI18nInput
  ): Promise<QuestionLocaleModel> {
    const questionLocale = await this.getBy({ question: { id: question.id }, locale })
    this.repo.merge(questionLocale, { ask })
    return await this.repo.save(questionLocale)
  }
}
