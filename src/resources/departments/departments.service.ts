import { LOCALES } from '@constants/locales'
import { DepartmentsI18nService } from '@departments-i18n/departments-i18n.service'
import { CreateDepartmentInput } from '@departments/dto/create-department.input'
import { UpdateDepartmentInput } from '@departments/dto/update-department.input'
import { DepartmentModel } from '@departments/entities/department.entity'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentModel) private readonly repo: Repository<DepartmentModel>,
    @Inject(DepartmentsI18nService) private readonly i18nService: DepartmentsI18nService
  ) {}

  async get(id: number): Promise<DepartmentModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException(`Department with id '${id} not found`)
    }
  }

  async list(): Promise<DepartmentModel[]> {
    return await this.repo.find()
  }

  async create({ key, name }: CreateDepartmentInput): Promise<DepartmentModel> {
    if (await this.repo.findOneBy({ key })) {
      throw new ConflictException('Department key already exists')
    }

    const department = await this.repo.save(this.repo.create({ key }))
    const departmentLocale = await this.i18nService.create(department, { name })

    return {
      ...department,
      name: departmentLocale.name
    }
  }

  async update(
    id: number,
    { name, locale = LOCALES.BR }: UpdateDepartmentInput
  ): Promise<DepartmentModel> {
    const department = await this.get(id)
    const departmentLocaleFound = await this.i18nService.getBy({ department: { id }, locale })
    if (departmentLocaleFound?.name && departmentLocaleFound.name === name) {
      return {
        ...department,
        name: departmentLocaleFound.name
      }
    }

    const departmentLocale = !departmentLocaleFound?.name
      ? await this.i18nService.create(department, { name, locale })
      : await this.i18nService.update(department, { name, locale })

    return {
      ...department,
      name: departmentLocale.name
    }
  }
}
