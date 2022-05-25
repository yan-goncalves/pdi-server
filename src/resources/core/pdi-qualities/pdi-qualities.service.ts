import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePdiQualityInput } from '@pdi-qualities/dto/create-pdi-quality.input'
import { UpdatePdiQualityInput } from '@pdi-qualities/dto/update-pdi-quality.input'
import { PdiQualityModel } from '@pdi-qualities/entities/pdi-quality.entity'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PdiQualitiesService {
  constructor(
    @InjectRepository(PdiQualityModel)
    private readonly repo: Repository<PdiQualityModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService
  ) {}

  async get(id: number): Promise<PdiQualityModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PdiQuality not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PdiQualityModel> | FindOptionsWhere<PdiQualityModel>[]
  ): Promise<PdiQualityModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PdiQuality not found')
    }
  }

  async list(): Promise<PdiQualityModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    category,
    description
  }: CreatePdiQualityInput): Promise<PdiQualityModel> {
    try {
      const performed = await this.performedService.get(idPerformed)
      return await this.repo.save(this.repo.create({ performed, category, description }))
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PdiQuality already exists')
    }
  }

  async update(
    id: number,
    { description, category }: UpdatePdiQualityInput
  ): Promise<PdiQualityModel> {
    const pdiQualityFound = await this.get(id)
    this.repo.merge(pdiQualityFound, { description, category })
    return await this.repo.save(pdiQualityFound)
  }

  async delete(id: number): Promise<PdiQualityModel> {
    const pdiQualityFound = await this.get(id)
    await this.repo.delete({ id: pdiQualityFound.id })

    return pdiQualityFound
  }
}
