import { DepartmentsService } from '@departments/departments.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('DepartmentsService', () => {
  let service: DepartmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService]
    }).compile()

    service = module.get<DepartmentsService>(DepartmentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
