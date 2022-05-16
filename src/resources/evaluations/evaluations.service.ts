import { CreateEvaluationInput } from '@evaluations/dto/create-evaluation.input'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compareAsc } from 'date-fns'
import { FindOptionsWhere, Repository } from 'typeorm'
import { UpdateEvaluationInput } from './dto/update-evaluation.input'

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(EvaluationModel) private readonly repo: Repository<EvaluationModel>
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
    return await this.repo.find()
  }

  async create({ year, mid, end, period }: CreateEvaluationInput): Promise<EvaluationModel> {
    const evaluationFound = await this.repo.findOneBy({ year })
    if (evaluationFound) {
      throw new ConflictException('Evaluation already exists')
    }

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
      const stage = !input?.mid ? 'endDate' : 'midDate'
      const opposite = stage === 'endDate' ? 'midDate' : 'endDate'

      const dates = [
        input[stage].start,
        input[stage].deadline,
        evaluation[opposite].start,
        evaluation[opposite].deadline
      ]
      const datesSorted = dates.sort(compareAsc)
      this.repo.merge(evaluation, {
        midDate: { start: datesSorted[0], deadline: datesSorted[1] },
        endDate: { start: datesSorted[2], deadline: datesSorted[2] }
      })
      await this.repo.save(evaluation)
    }

    if (input?.period) {
      this.repo.merge(evaluation, { period: input.period })
      await this.repo.save(evaluation)
    }

    if (typeof input?.finished === 'boolean') {
      this.repo.merge(evaluation, { finished: input.finished })
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
