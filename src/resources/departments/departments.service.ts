import { EntityFindOptions } from '@constants/common'
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

  async get(id: number, locale = LOCALES.BR): Promise<DepartmentModel> {
    const department = await this.repo.findOneBy({ id })
    if (!department) {
      throw new NotFoundException(`Department with id '${id} not found`)
    }

    const departmentLocale = await this.i18nService.getBy({
      department: { id: department.id },
      locale
    })
    return { ...department, name: departmentLocale?.name || null }
  }

  async getByName(name: string): Promise<DepartmentModel> {
    try {
      const departments = await this.list()
      return departments.find((department) => department.name === name)
    } catch {
      throw new NotFoundException('Department not found')
    }
  }

  async list(options?: EntityFindOptions<DepartmentModel>): Promise<DepartmentModel[]> {
    const { locale = LOCALES.BR, relations = [] } = options || {}

    const departments = await this.repo.find({ relations })
    const mappedDepartments = departments.map(async (department) => ({
      ...department,
      name: await this.i18nService
        .getBy({
          department: { id: department.id },
          locale
        })
        .then((departmentLocale) => departmentLocale?.name || null)
    }))

    return await Promise.all(mappedDepartments)
  }

  async create({ key, name }: CreateDepartmentInput): Promise<DepartmentModel> {
    if (await this.repo.findOneBy({ key })) {
      throw new ConflictException('Department key already exists')
    }

    const department = await this.repo.save(this.repo.create({ key }))
    const departmentLocale = await this.i18nService.create(department, { name })

    return { ...department, name: departmentLocale.name }
  }

  async update(
    id: number,
    { name, locale = LOCALES.BR }: UpdateDepartmentInput
  ): Promise<DepartmentModel> {
    const department = await this.get(id, locale)
    if (department?.name && department.name === name) {
      return department
    }

    const departmentLocale = !department?.name
      ? await this.i18nService.create(department, { name, locale })
      : await this.i18nService.update(department, { name, locale })

    return { ...department, name: departmentLocale.name }
  }
}
