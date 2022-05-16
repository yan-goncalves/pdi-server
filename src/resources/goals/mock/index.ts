import faker from '@faker-js/faker'
import { GoalModel } from '@goals/entities/goal.entity'
import userMock from '@users/mock'

const goalMock: GoalModel = {
  id: 1,
  manager: userMock(),
  name: '',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default goalMock
