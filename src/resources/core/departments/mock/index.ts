import departmentLocaleMock from '@departments-i18n/mock'
import { DepartmentModel } from '@departments/entities/department.entity'
import faker from '@faker-js/faker'

const departmentMock: DepartmentModel = {
  id: 1,
  key: 'TI',
  name: 'Tecnologia da Informação',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: departmentLocaleMock
}

export default departmentMock
