import { KpiInput } from '@kpis/dto/kpi.input'
import { KpiModel } from '@kpis/entities/kpi.entity'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class KpisService {
  constructor(
    @InjectRepository(KpiModel) private readonly repo: Repository<KpiModel>,
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

  async list(idManager: number, isDirector = false): Promise<KpiModel[]> {
    return await this.repo.find({
      where: { manager: { id: !isDirector ? idManager : undefined } },
      relations: !isDirector ? undefined : ['manager']
    })
  }

  async create(idManager: number, { name }: KpiInput): Promise<KpiModel> {
    const manager = await this.usersService.get(idManager)
    const kpiFound = await this.repo.findOne({
      where: { manager: { id: manager.id }, name },
      withDeleted: true
    })

    if (kpiFound) {
      if (!kpiFound?.deletedAt) {
        throw new ConflictException('Kpi already exists')
      }
      return await this.repo.save(this.repo.merge(kpiFound, { deletedAt: null }))
    }

    return await this.repo.save(this.repo.create({ manager, name }))
  }

  async update(id: number, idManager: number, { name }: KpiInput): Promise<KpiModel> {
    const kpiFound = await this.repo.findOneBy({ id, manager: { id: idManager } })
    if (!kpiFound) {
      throw new NotFoundException('Kpi not found')
    }

    return await this.repo.save(this.repo.merge(kpiFound, { name }))
  }

  async setDeleted(id: number, idManager: number, deleted = true): Promise<KpiModel> {
    const kpiFound = await this.repo.findOne({
      where: { id, manager: { id: idManager } },
      withDeleted: true
    })

    if (!kpiFound) {
      throw new NotFoundException('Kpi not found')
    }

    if (deleted === false) {
      return await this.repo.save(this.repo.merge(kpiFound, { deletedAt: null }))
    }

    await this.repo.softDelete({ id: kpiFound.id })

    return await this.repo.findOne({
      where: { id: kpiFound.id },
      withDeleted: true
    })
  }
}
