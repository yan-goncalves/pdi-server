import { LOCALES } from '@constants/locales'
import { FeedbacksI18nService } from '@feedbacks-i18n/feedbacks-i18n.service'
import { CreateFeedbackInput } from '@feedbacks/dto/create-feedback.input'
import { UpdateFeedbackInput } from '@feedbacks/dto/update-feedback.input'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbackModel) private readonly repo: Repository<FeedbackModel>,
    @Inject(FeedbacksI18nService) private readonly i18nService: FeedbacksI18nService
  ) {}

  async get(id: number): Promise<FeedbackModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`Feedback with id '${id} not found`)
    }
  }

  async list(): Promise<FeedbackModel[]> {
    return await this.repo.find()
  }

  async create({ inquire }: CreateFeedbackInput): Promise<FeedbackModel> {
    if (await this.i18nService.getBy({ inquire })) {
      throw new ConflictException('Feedback already exists')
    }

    const feedback = await this.repo.save(this.repo.create())
    const feedbackLocale = await this.i18nService.create(feedback, { inquire })

    return {
      ...feedback,
      inquire: feedbackLocale.inquire
    }
  }

  async update(
    id: number,
    { inquire, locale = LOCALES.BR }: UpdateFeedbackInput
  ): Promise<FeedbackModel> {
    const feedback = await this.get(id)

    const feedbackLocaleFound = await this.i18nService.getBy({ feedback: { id }, locale })
    if (feedbackLocaleFound?.inquire && feedbackLocaleFound.inquire === inquire) {
      return feedback
    }

    const feedbackLocale = !feedbackLocaleFound?.inquire
      ? await this.i18nService.create(feedback, { inquire, locale })
      : await this.i18nService.update(feedback, { inquire, locale })

    return {
      ...feedback,
      inquire: feedbackLocale.inquire
    }
  }
}
