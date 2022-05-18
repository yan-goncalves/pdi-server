import { EvaluationsService } from '@evaluations/evaluations.service'
import {
  ConflictException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationInput } from '@performed-evaluations/dto/performed-evaluation.input'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'

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
    } catch {
      throw new NotFoundException('PerformedEvaluation not found')
    }
  }

  async getBy(
    options:
      | FindOptionsWhere<PerformedEvaluationModel>
      | FindOptionsWhere<PerformedEvaluationModel>[]
  ): Promise<PerformedEvaluationModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedEvaluation not found')
    }
  }

  async list(): Promise<PerformedEvaluationModel[]> {
    return await this.repo.find()
  }

  async create({
    idEvaluation,
    idUser
  }: PerformedEvaluationInput): Promise<PerformedEvaluationModel> {
    try {
      const evaluation = await this.evaluationsService.get(idEvaluation)
      const user = await this.usersService.get(idUser)
      return await this.repo.save(this.repo.create({ evaluation, user }))
    } catch {
      throw new ConflictException('PerformedEvaluation already exists')
    }
  }

  async delete(id: number): Promise<PerformedEvaluationModel> {
    try {
      const performedEvaluationFound = await this.get(id)
      await this.repo.delete({ id: performedEvaluationFound.id })

      return performedEvaluationFound
    } catch (Error) {
      if (Error instanceof NotFoundException) {
        throw Error
      }
      throw new MethodNotAllowedException('Unable to remove. PerformedEvaluation in use')
    }
  }
}
