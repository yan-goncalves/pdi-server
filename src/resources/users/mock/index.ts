import { ROLES } from '@constants/roles'
import departmentMock from '@departments/mock'
import faker from '@faker-js/faker'
import userInfoMock from '@users-info/mock'
import { CreateUserInput } from '@users/dto/create-user.input'
import { UserModel } from '@users/entities/user.entity'
import { hashSync } from 'bcrypt'

const userMock: (input?: CreateUserInput) => UserModel = (input?: CreateUserInput) => {
  return {
    id: 1,
    username: input?.username ?? faker.internet.userName(),
    email: input?.email ?? faker.internet.email(),
    password: hashSync('1@asdfgsl', 10),
    role: input?.role ?? ROLES.USER,
    blocked: false,
    confirmed: false,
    createdAt: faker.date.past(1),
    updatedAt: faker.date.recent(1),
    setDefaultPassword: () => ({}),
    info: userInfoMock,
    department: departmentMock
  }
}

export default userMock
