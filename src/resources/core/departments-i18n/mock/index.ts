import { LOCALES } from '@constants/locales'
import { DepartmentLocaleModel } from '@departments-i18n/entities/department-i18n.entity'
import faker from '@faker-js/faker'
import departmentMock from 'src/resources/core/departments/mock'

const departmentLocaleMock: DepartmentLocaleModel = {
  id: 1,
  department: departmentMock,
  locale: LOCALES.BR,
  name: 'Tecnologia da Informação',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default departmentLocaleMock
