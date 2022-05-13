import { LOCALES } from '@constants/locales'
import departmentMock from '@departments/mock'
import faker from '@faker-js/faker'
import { DepartmentLocaleModel } from '../entities/departments-i18n.entity'

const departmentLocaleMock: DepartmentLocaleModel = {
  id: 1,
  department: departmentMock,
  locale: LOCALES.BR,
  name: 'Tecnologia da Informação',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default departmentLocaleMock
