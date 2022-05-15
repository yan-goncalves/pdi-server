import { DepartmentsResolver } from '@departments/departments.resolver'
import { DepartmentsService } from '@departments/departments.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('DepartmentsResolver', () => {
  let resolver: DepartmentsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsResolver, DepartmentsService]
    }).compile()

    resolver = module.get<DepartmentsResolver>(DepartmentsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
