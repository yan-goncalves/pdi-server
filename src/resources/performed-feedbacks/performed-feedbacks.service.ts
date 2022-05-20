import { FeedbacksService } from '@feedbacks/feedbacks.service'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { CreatePerformedFeedbackInput } from '@performed-feedbacks/dto/create-performed-feedback.input'
import { PerformedFeedbackModel } from '@performed-feedbacks/entities/performed-feedback.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UpdatePerformedFeedbackInput } from './dto/update-performed-feedback.input'

@Injectable()
export class PerformedFeedbacksService {
  constructor(
    @InjectRepository(PerformedFeedbackModel)
    private readonly repo: Repository<PerformedFeedbackModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(FeedbacksService)
    private readonly feedbacksService: FeedbacksService
  ) {}

  async get(id: number): Promise<PerformedFeedbackModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PerformedFeedback not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PerformedFeedbackModel> | FindOptionsWhere<PerformedFeedbackModel>[]
  ): Promise<PerformedFeedbackModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedFeedback not found')
    }
  }

  async list(): Promise<PerformedFeedbackModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    idFeedback,
    ...input
  }: CreatePerformedFeedbackInput): Promise<PerformedFeedbackModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const feedback = await this.feedbacksService.get(idFeedback)
      return await this.repo.save(this.repo.create({ performed, feedback, ...input }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      throw new ConflictException('PerformedFeedback already exists')
    }
  }

  async update(id: number, input: UpdatePerformedFeedbackInput): Promise<PerformedFeedbackModel> {
    try {
      const performedFeedback = await this.get(id)
      this.repo.merge(performedFeedback, { ...input })
      return await this.repo.save(performedFeedback)
    } catch (error) {
      throw error
    }
  }
}
