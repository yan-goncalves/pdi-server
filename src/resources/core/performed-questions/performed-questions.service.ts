import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { CreatePerformedQuestionInput } from '@performed-questions/dto/create-performed-question.input'
import { UpdatePerformedQuestionInput } from '@performed-questions/dto/update-performed-question.input'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import { QuestionsService } from '@questions/questions.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PerformedQuestionsService {
  constructor(
    @InjectRepository(PerformedQuestionModel)
    private readonly repo: Repository<PerformedQuestionModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(QuestionsService) private readonly questionsService: QuestionsService
  ) {}

  async get(id: number): Promise<PerformedQuestionModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PerformedQuestion not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PerformedQuestionModel> | FindOptionsWhere<PerformedQuestionModel>[]
  ): Promise<PerformedQuestionModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedQuestion not found')
    }
  }

  async list(): Promise<PerformedQuestionModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    idQuestion,
    ...input
  }: CreatePerformedQuestionInput): Promise<PerformedQuestionModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      const question = await this.questionsService.get(idQuestion)
      return await this.repo.save(this.repo.create({ performed, question, ...input }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PerformedQuestion already exists')
    }
  }

  async update(id: number, input: UpdatePerformedQuestionInput): Promise<PerformedQuestionModel> {
    const performedQuestionFound = await this.get(id)
    this.repo.merge(performedQuestionFound, { ...input })
    return await this.repo.save(performedQuestionFound)
  }
}
