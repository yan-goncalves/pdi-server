import faker from '@faker-js/faker'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import userMock from '@users/mock'

const userInfoMock: UsersInfoModel = {
  id: 1,
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  user: userMock()
}

export default userInfoMock
