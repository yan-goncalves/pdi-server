import { UsersService } from '@core/users/users.service'
import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
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
    private readonly performedService: PerformedEvaluationsService,
    @Inject(UsersService)
    private readonly usersService: UsersService
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

  async create(
    idManager: number,
    {
      idPerformed,
      category,
      description
    }: CreatePdiQualityInput
  ): Promise<PdiQualityModel> {
    try {
      const performed = await this.performedService.get(idPerformed, { loadRelations: true })
      const performedUser = await this.usersService.get({ id: performed.user.id }, { loadRelations: true })

      // Verify if manager is the direct manager of the user
      if (performedUser.manager?.id !== idManager) {
        throw new ForbiddenException('You can only manage PDI for your direct reports')
      }

      return await this.repo.save(this.repo.create({ performed, category, description }))
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error
      }
      throw new ConflictException('PdiQuality already exists')
    }
  }

  async update(
    idManager: number,
    id: number,
    { description, category }: UpdatePdiQualityInput
  ): Promise<PdiQualityModel> {
    const pdiQualityFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiQualityFound) {
      throw new NotFoundException('PdiQuality not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiQualityFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    this.repo.merge(pdiQualityFound, { description, category })
    return await this.repo.save(pdiQualityFound)
  }

  async delete(idManager: number, id: number): Promise<PdiQualityModel> {
    const pdiQualityFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiQualityFound) {
      throw new NotFoundException('PdiQuality not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiQualityFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    await this.repo.delete({ id: pdiQualityFound.id })

    return pdiQualityFound
  }
}
