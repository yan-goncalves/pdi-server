import { faker } from '@faker-js/faker'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import userMock from '@users/mock'

const userInfoMock: UsersInfoModel = {
  id: 1,
  name: faker.person.firstName(),
  lastname: faker.person.lastName(),
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 }),
  user: userMock()
}

export default userInfoMock
