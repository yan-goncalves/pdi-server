import { GoalsService } from '@goals/goals.service'
import { KpiInput } from '@kpis/dto/kpi.input'
import { KpiModel } from '@kpis/entities/kpi.entity'
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateKpiInput } from './dto/create-kpi.input'

@Injectable()
export class KpisService {
  constructor(
    @InjectRepository(KpiModel) private readonly repo: Repository<KpiModel>,
    @Inject(GoalsService) private readonly goalsService: GoalsService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number, idManager: number, loadRelations = false): Promise<KpiModel> {
    try {
      return await this.repo.findOneOrFail({
        where: { id, manager: { id: idManager } },
        relations: !loadRelations ? undefined : ['manager']
      })
    } catch {
      throw new NotFoundException('Kpi not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<KpiModel> | FindOptionsWhere<KpiModel>[]
  ): Promise<KpiModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('Kpi not found')
    }
  }

  async list(idManager: number): Promise<KpiModel[]> {
    const list = await this.repo.find({
      where: { manager: { id: idManager } },
      relations: ['manager']
    })

    return list.filter(
      (value, index, self) => self.map((goal) => goal.name).indexOf(value.name) === index
    )
  }

  async create(
    idManager: number,
    { idGoal, name, target, weight }: CreateKpiInput
  ): Promise<KpiModel> {
    const goal = await this.goalsService.get(idGoal, idManager, true)
    const manager = await this.usersService.get({ id: idManager })

    if (manager.id !== goal.manager.id) {
      throw new ForbiddenException('You are not the manager of this user ')
    }

    try {
      return await this.repo.save(this.repo.create({ goal, manager, name, target, weight }))
    } catch {
      throw new ConflictException('Kpi already exists')
    }
  }

  async update(
    id: number,
    idManager: number,
    { name, target, weight }: KpiInput
  ): Promise<KpiModel> {
    const manager = await this.usersService.get({ id: idManager })
    const kpiFound = await this.repo.findOneBy({ id, manager: { id: manager.id } })

    if (!kpiFound) {
      throw new NotFoundException('Kpi not found')
    }

    return await this.repo.save(this.repo.merge(kpiFound, { name, target, weight }))
  }

  async delete(id: number, idManager: number): Promise<KpiModel> {
    try {
      const kpiFound = await this.getBy({ id, manager: { id: idManager } })
      await this.repo.delete({ id: kpiFound.id })

      return kpiFound
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new MethodNotAllowedException('Unable to remove. Kpi in use')
    }
  }
}
