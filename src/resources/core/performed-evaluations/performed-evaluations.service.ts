import { EvaluationsService } from '@evaluations/evaluations.service'
import {
  ConflictException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePerformedEvaluationInput } from '@performed-evaluations/dto/create-performed-evaluation.input'
import { UpdatePerformedEvaluationInput } from '@performed-evaluations/dto/update-performed-evaluation.input'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class PerformedEvaluationsService {
  constructor(
    @InjectRepository(PerformedEvaluationModel)
    private readonly repo: Repository<PerformedEvaluationModel>,
    @Inject(EvaluationsService) private readonly evaluationsService: EvaluationsService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number): Promise<PerformedEvaluationModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException('PerformedEvaluation not found')
    }
  }

  async getByRelation({
    idEvaluation,
    idUser
  }: CreatePerformedEvaluationInput): Promise<PerformedEvaluationModel> {
    const evaluation = await this.evaluationsService.get(idEvaluation)
    const user = await this.usersService.get({ id: idUser })

    return await this.getBy({ evaluation: { id: evaluation.id }, user: { id: user.id } })
  }

  async getBy(
    options:
      | FindOptionsWhere<PerformedEvaluationModel>
      | FindOptionsWhere<PerformedEvaluationModel>[]
  ): Promise<PerformedEvaluationModel> {
    try {
      return await this.repo.findOneOrFail({
        where: options,
        relations: {
          questions: {
            performed: false
          },

          skills: {
            performed: false
          },

          goals: {
            performed: false,
            performedKpis: true
          },

          feedbacks: {
            performed: false
          },

          pdiCoaching: {
            performed: false
          },

          pdiCompetence: {
            performed: false
          },

          pdiQuality: {
            performed: false
          }
        }
      })
    } catch (error) {
      throw new NotFoundException('PerformedEvaluation not found')
    }
  }

  async getGrade(id: number): Promise<PerformedEvaluationModel> {
    try {
      return await this.repo.findOne({
        where: { id },
        loadEagerRelations: false
      })
    } catch (error) {
      throw new NotFoundException('PerformedEvaluation not found')
    }
  }

  async list(): Promise<PerformedEvaluationModel[]> {
    return await this.repo.find()
  }

  async create({
    idEvaluation,
    idUser
  }: CreatePerformedEvaluationInput): Promise<PerformedEvaluationModel> {
    try {
      const evaluation = await this.evaluationsService.get(idEvaluation)
      const user = await this.usersService.get({ id: idUser })
      return await this.repo.save(this.repo.create({ evaluation, user }))
    } catch {
      throw new ConflictException('PerformedEvaluation already exists')
    }
  }

  async update(
    id: number,
    input: UpdatePerformedEvaluationInput
  ): Promise<PerformedEvaluationModel> {
    const performed = await this.get(id)

    if (typeof input?.midFinished === 'boolean') {
      this.repo.merge(performed, { midFinished: input.midFinished })
      await this.repo.save(performed)
    }

    if (typeof input?.endFinished === 'boolean') {
      this.repo.merge(performed, { endFinished: input.endFinished })
      await this.repo.save(performed)
    }

    return performed
  }

  async updateMany(
    options: FindOptionsWhere<PerformedEvaluationModel>,
    partialEntity: QueryDeepPartialEntity<PerformedEvaluationModel>
  ): Promise<void> {
    await this.repo.update(options, partialEntity)
  }

  async delete(id: number): Promise<PerformedEvaluationModel> {
    try {
      const performedEvaluationFound = await this.get(id)
      await this.repo.delete({ id: performedEvaluationFound.id })

      return performedEvaluationFound
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new MethodNotAllowedException('Unable to remove. PerformedEvaluation in use')
    }
  }
}
