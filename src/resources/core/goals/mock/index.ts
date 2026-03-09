import evaluationMock from '@evaluations/mock'
import { faker } from '@faker-js/faker'
import { GoalModel } from '@goals/entities/goal.entity'
import kpiMock from '@kpis/mock'
import userMock from '@users/mock'

const goalMock: GoalModel = {
  id: 1,
  evaluation: evaluationMock,
  manager: userMock(),
  user: userMock(),
  name: '',
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 }),
  kpis: [kpiMock]
}

export default goalMock
