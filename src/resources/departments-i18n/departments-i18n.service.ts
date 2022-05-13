import { LOCALES } from '@constants/locales'
import { DepartmentModel } from '@departments/entities/department.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateDepartmentsI18nInput } from './dto/create-departments-i18n.input'
import { UpdateDepartmentsI18nInput } from './dto/update-departments-i18n.input'
import { DepartmentLocaleModel } from './entities/departments-i18n.entity'

@Injectable()
export class DepartmentsI18nService {
  constructor(
    @InjectRepository(DepartmentLocaleModel)
    private readonly repo: Repository<DepartmentLocaleModel>
  ) {}

  async get(id: number): Promise<DepartmentLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Department locale not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<DepartmentLocaleModel> | FindOptionsWhere<DepartmentLocaleModel>[]
  ): Promise<DepartmentLocaleModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      return null
    }
  }

  async create(
    department: DepartmentModel,
    { name, locale = LOCALES.BR }: CreateDepartmentsI18nInput
  ): Promise<DepartmentLocaleModel> {
    return await this.repo.save(this.repo.create({ department, name, locale }))
  }

  async update(
    department: DepartmentModel,
    { name, locale = LOCALES.BR }: UpdateDepartmentsI18nInput
  ): Promise<DepartmentLocaleModel> {
    const departmentLocale = await this.getBy({ department: { id: department.id }, locale })
    this.repo.merge(departmentLocale, { name })
    return await this.repo.save(departmentLocale)
  }
}
