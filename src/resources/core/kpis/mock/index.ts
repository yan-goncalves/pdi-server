import { faker } from '@faker-js/faker'
import goalMock from '@goals/mock'
import { KpiModel } from '@kpis/entities/kpi.entity'
import userMock from '@users/mock'

const kpiMock: KpiModel = {
  id: 1,
  goal: goalMock,
  manager: userMock(),
  name: '',
  target: '',
  weight: 30,
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 })
}

export default kpiMock
