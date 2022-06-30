import faker from '@faker-js/faker'
import goalMock from '@goals/mock'
import performedEvaluationMock from '@performed-evaluations/mock'
import performedGoalKpiMock from '@performed-goals-kpis/mock'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'

const performedGoalMock: PerformedGoalModel = {
  id: 1,
  performed: performedEvaluationMock,
  goal: goalMock,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  performedKpis: [performedGoalKpiMock]
}

export default performedGoalMock
