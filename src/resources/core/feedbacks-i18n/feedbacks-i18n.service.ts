import { LOCALES } from '@constants/locales'
import { FeedbackI18nInput } from '@feedbacks-i18n/dto/feedback-i18n.input'
import { FeedbackLocaleModel } from '@feedbacks-i18n/entities/feedback-i18n.entity'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, In, Repository } from 'typeorm'

@Injectable()
export class FeedbacksI18nService {
  constructor(
    @InjectRepository(FeedbackLocaleModel)
    private readonly repo: Repository<FeedbackLocaleModel>
  ) {}

  async get(id: number): Promise<FeedbackLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Feedback not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<FeedbackLocaleModel> | FindOptionsWhere<FeedbackLocaleModel>[]
  ): Promise<FeedbackLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  listByFeedbacksIds(feedbacksIds: number[], locale: LOCALES): Promise<FeedbackLocaleModel[]> {
    return this.repo.find({ where: { feedback: { id: In(feedbacksIds) }, locale } })
  }

  async create(
    feedback: FeedbackModel,
    { inquire, locale = LOCALES.BR }: FeedbackI18nInput
  ): Promise<FeedbackLocaleModel> {
    return await this.repo.save(this.repo.create({ feedback, locale, inquire }))
  }

  async update(
    feedback: FeedbackModel,
    { inquire, locale = LOCALES.BR }: FeedbackI18nInput
  ): Promise<FeedbackLocaleModel> {
    const feedbackLocale = await this.getBy({ feedback: { id: feedback.id }, locale })
    this.repo.merge(feedbackLocale, { inquire })
    return await this.repo.save(feedbackLocale)
  }
}
