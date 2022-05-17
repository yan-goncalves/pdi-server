import { DepartmentsService } from '@departments/departments.service'
import { CreateDepartmentInput } from '@departments/dto/create-department.input'
import { UpdateDepartmentInput } from '@departments/dto/update-department.input'
import { DepartmentModel } from '@departments/entities/department.entity'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => DepartmentModel)
export class DepartmentsResolver {
  constructor(@Inject(DepartmentsService) private readonly service: DepartmentsService) {}

  @Query(() => DepartmentModel, { name: 'department' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<DepartmentModel> {
    return await this.service.get(id)
  }

  @Query(() => [DepartmentModel], { name: 'departments' })
  async list(): Promise<DepartmentModel[]> {
    return await this.service.list()
  }

  @Mutation(() => DepartmentModel)
  async createDepartment(@Args('input') input: CreateDepartmentInput): Promise<DepartmentModel> {
    return await this.service.create(input)
  }

  @Mutation(() => DepartmentModel)
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentInput
  ): Promise<DepartmentModel> {
    return await this.service.update(id, input)
  }
}
