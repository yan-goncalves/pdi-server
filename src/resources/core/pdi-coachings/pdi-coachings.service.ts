import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { CreatePdiCoachingInput } from 'src/resources/core/pdi-coachings/dto/create-pdi-coaching.input'
import { UpdatePdiCoachingInput } from 'src/resources/core/pdi-coachings/dto/update-pdi-coaching.input'
import { PdiCoachingModel } from 'src/resources/core/pdi-coachings/entities/pdi-coaching.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PdiCoachingsService {
  constructor(
    @InjectRepository(PdiCoachingModel)
    private readonly repo: Repository<PdiCoachingModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService
  ) {}

  async get(id: number): Promise<PdiCoachingModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PdiCoaching not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PdiCoachingModel> | FindOptionsWhere<PdiCoachingModel>[]
  ): Promise<PdiCoachingModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PdiCoaching not found')
    }
  }

  async list(): Promise<PdiCoachingModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    category,
    action
  }: CreatePdiCoachingInput): Promise<PdiCoachingModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      return await this.repo.save(this.repo.create({ performed, category, action }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PdiCoaching already exists')
    }
  }

  async update(
    id: number,
    { action, category }: UpdatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    const pdiCoachingFound = await this.get(id)
    this.repo.merge(pdiCoachingFound, { action, category })
    return await this.repo.save(pdiCoachingFound)
  }

  async delete(id: number): Promise<PdiCoachingModel> {
    const pdiCoachingFound = await this.get(id)
    await this.repo.delete({ id: pdiCoachingFound.id })

    return pdiCoachingFound
  }
}
