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

  async getByName(name: string): Promise<DepartmentModel> {
    const departmentI18nFound = await this.i18nService.getBy(
      { name, locale: LOCALES.BR },
      { relations: true }
    )
    if (!departmentI18nFound) {
      throw new NotFoundException(`Department with name '${name}' not found`)
    }

    return {
      id: departmentI18nFound.department.id,
      key: departmentI18nFound.department.key,
      name: departmentI18nFound.name,
      locale: departmentI18nFound.department.locale,
      createdAt: departmentI18nFound.department.createdAt,
      updatedAt: departmentI18nFound.department.updatedAt
    }
  }

  async list({ loadName } = { loadName: false }): Promise<DepartmentModel[]> {
    const departments = await this.repo.find()

    if (!loadName) {
      return departments
    }

    const departmentsMap = departments.map(async (department) => {
      const departmentLocale = await this.i18nService.getBy({
        department: { id: department.id },
        locale: LOCALES.BR
      })

      return {
        ...department,
        name: departmentLocale.name
      }
    })

    return Promise.all(departmentsMap)
  }

  async create({ key, name }: CreateDepartmentInput): Promise<DepartmentModel> {
    try {
      const department = await this.repo.save(this.repo.create({ key }))
      const departmentLocaleBR = await this.i18nService.create(department, {
        name,
        locale: LOCALES.BR
      })
      const departmentLocaleEN = await this.i18nService.create(department, {
        name,
        locale: LOCALES.EN
      })

      return {
        ...department,
        name: departmentLocaleBR.name
      }
    } catch {
      throw new ConflictException('Department key already exists')
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
