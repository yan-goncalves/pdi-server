import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsResolver } from 'src/resources/core/departments/departments.resolver'
import { DepartmentsService } from 'src/resources/core/departments/departments.service'

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
