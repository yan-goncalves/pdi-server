import faker from '@faker-js/faker'
import { KpiModel } from '@kpis/entities/kpi.entity'
import userMock from '@users/mock'

const kpiMock: KpiModel = {
  id: 1,
  manager: userMock(),
  name: '',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default kpiMock
