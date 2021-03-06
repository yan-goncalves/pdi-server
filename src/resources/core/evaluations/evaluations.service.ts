import { CreateEvaluationInput } from '@evaluations/dto/create-evaluation.input'
import { UpdateEvaluationInput } from '@evaluations/dto/update-evaluation.input'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { FeedbacksService } from '@feedbacks/feedbacks.service'
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SectionsService } from '@sections/sections.service'
import { compareAsc } from 'date-fns'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(EvaluationModel) private readonly repo: Repository<EvaluationModel>,
    @Inject(SectionsService) private readonly sectionsService: SectionsService,
    @Inject(FeedbacksService) private readonly feedbacksService: FeedbacksService
  ) {}

  async get(id: number): Promise<EvaluationModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Evaluation not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<EvaluationModel> | FindOptionsWhere<EvaluationModel>[]
  ): Promise<EvaluationModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('Evaluation not found')
    }
  }

  async list(): Promise<EvaluationModel[]> {
    return await this.repo.find({ order: { year: 'DESC' } })
  }

  async create({ year, mid, end, period }: CreateEvaluationInput): Promise<EvaluationModel> {
    try {
      const dates = [mid.start, mid.deadline, end.start, end.deadline]
      const datesSorted = dates.sort(compareAsc)

      return await this.repo.save(
        this.repo.create({
          year,
          midDate: {
            start: datesSorted[0],
            deadline: datesSorted[1]
          },
          endDate: {
            start: datesSorted[2],
            deadline: datesSorted[3]
          },
          period
        })
      )
    } catch {
      throw new ConflictException('Evaluation already exists')
    }
  }

  async addSection(id: number, idSection: number): Promise<EvaluationModel> {
    const evaluation = await this.get(id)
    const section = await this.sectionsService.get(idSection)

    if (evaluation?.sections.some((s) => s.id === section.id)) {
      throw new MethodNotAllowedException('Section already exists in this Evaluation')
    }

    this.repo.merge(evaluation, { sections: [section] })

    return await this.repo.save(evaluation)
  }

  async addFeedback(id: number, idFeedback: number): Promise<EvaluationModel> {
    const evaluation = await this.get(id)
    const feedback = await this.feedbacksService.get(idFeedback)

    if (evaluation?.feedbacks.some((s) => s.id === feedback.id)) {
      throw new MethodNotAllowedException('Feedback already exists in this Evaluation')
    }

    this.repo.merge(evaluation, { feedbacks: [feedback] })

    return await this.repo.save(evaluation)
  }

  async update(id: number, input: UpdateEvaluationInput): Promise<EvaluationModel> {
    const evaluation = await this.get(id)

    if (input?.year) {
      try {
        this.repo.merge(evaluation, { year: input.year })
        await this.repo.save(evaluation)
      } catch {
        throw new ForbiddenException('Evaluation year already exists')
      }
    }

    if (input?.mid || input?.end) {
      const field = !input?.mid ? 'endDate' : 'midDate'
      const oppositeField = field === 'endDate' ? 'midDate' : 'endDate'

      const dates = [
        input[field].start,
        input[field].deadline,
        evaluation[oppositeField].start,
        evaluation[oppositeField].deadline
      ]
      const datesSorted = dates.sort(compareAsc)
      this.repo.merge(evaluation, {
        midDate: { start: datesSorted[0], deadline: datesSorted[1] },
        endDate: { start: datesSorted[2], deadline: datesSorted[3] }
      })
      await this.repo.save(evaluation)
    }

    if (input?.period) {
      this.repo.merge(evaluation, { period: input.period })
      await this.repo.save(evaluation)
    }

    return evaluation
  }

  async setDeleted(id: number, deleted = true): Promise<EvaluationModel> {
    const evaluationFound = await this.repo.findOne({ where: { id }, withDeleted: true })

    if (!evaluationFound) {
      throw new NotFoundException('Evaluation not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(evaluationFound, { deletedAt: null }))
    }

    await this.repo.softDelete({ id: evaluationFound.id })
  }
}
