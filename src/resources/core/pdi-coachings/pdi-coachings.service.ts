import { UsersService } from '@core/users/users.service'
import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePdiCoachingInput } from '@pdi-coachings/dto/create-pdi-coaching.input'
import { UpdatePdiCoachingInput } from '@pdi-coachings/dto/update-pdi-coaching.input'
import { PdiCoachingModel } from '@pdi-coachings/entities/pdi-coaching.entity'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PdiCoachingsService {
  constructor(
    @InjectRepository(PdiCoachingModel)
    private readonly repo: Repository<PdiCoachingModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) { }

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

  async create(
    idManager: number,
    {
      idPerformed,
      category,
      action
    }: CreatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    try {
      const performed = await this.performedService.get(idPerformed, { loadRelations: true })
      const performedUser = await this.usersService.get({ id: performed.user.id }, { loadRelations: true })

      // Verify if manager is the direct manager of the user
      if (performedUser.manager?.id !== idManager) {
        throw new ForbiddenException('You can only manage PDI for your direct reports')
      }

      return await this.repo.save(this.repo.create({ performed, category, action }))
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error
      }
      throw new ConflictException('PdiCoaching already exists')
    }
  }

  async update(
    idManager: number,
    id: number,
    { action, category }: UpdatePdiCoachingInput
  ): Promise<PdiCoachingModel> {
    const pdiCoachingFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiCoachingFound) {
      throw new NotFoundException('PdiCoaching not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiCoachingFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    this.repo.merge(pdiCoachingFound, { action, category })
    return await this.repo.save(pdiCoachingFound)
  }

  async delete(idManager: number, id: number): Promise<PdiCoachingModel> {
    const pdiCoachingFound = await this.repo.findOne({
      where: { id },
      relations: ['performed', 'performed.user', 'performed.user.manager']
    })

    if (!pdiCoachingFound) {
      throw new NotFoundException('PdiCoaching not found')
    }

    // Verify if manager is the direct manager of the user
    if (pdiCoachingFound.performed.user.manager?.id !== idManager) {
      throw new ForbiddenException('You can only manage PDI for your direct reports')
    }

    await this.repo.delete({ id: pdiCoachingFound.id })

    return pdiCoachingFound
  }
}
