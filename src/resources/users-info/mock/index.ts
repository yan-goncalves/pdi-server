import faker from '@faker-js/faker'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { UserModel } from '@users/entities/user.entity'

const userInfoMock: UsersInfoModel = {
  id: 1,
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  user: {} as UserModel
}

export default userInfoMock
