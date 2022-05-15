import { LOCALES } from '@constants/locales'
import { DepartmentsService } from '@departments/departments.service'
import { CreateDepartmentInput } from '@departments/dto/create-department.input'
import { UpdateDepartmentInput } from '@departments/dto/update-department.input'
import { DepartmentModel } from '@departments/entities/department.entity'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FindOptionsRelations } from 'typeorm'

@Resolver(() => DepartmentModel)
export class DepartmentsResolver {
  constructor(@Inject(DepartmentsService) private readonly service: DepartmentsService) {}

  @Query(() => DepartmentModel, { name: 'department' })
  async get(
    @Args('id', { type: () => Int }) id: number,
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES
  ): Promise<DepartmentModel> {
    return this.service.get(id, locale)
  }

  @Query(() => [DepartmentModel], { name: 'departments' })
  async list(
    @Args('locale', { nullable: true, defaultValue: LOCALES.BR }) locale?: LOCALES,
    @Args('relations', { nullable: true, defaultValue: [], type: () => [String] })
    relations?: FindOptionsRelations<DepartmentModel>
  ): Promise<DepartmentModel[]> {
    return await this.service.list({ locale, relations })
  }

  @Mutation(() => DepartmentModel)
  createDepartment(@Args('input') input: CreateDepartmentInput): Promise<DepartmentModel> {
    return this.service.create(input)
  }

  @Mutation(() => DepartmentModel)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentInput
  ): Promise<DepartmentModel> {
    return this.service.update(id, input)
  }
}
