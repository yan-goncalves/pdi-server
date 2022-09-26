import faker from '@faker-js/faker'
import kpiMock from '@kpis/mock'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import performedGoalMock from '@performed-goals/mock'
import ratingMock from '@ratings/mock'

const performedGoalKpiMock: PerformedGoalKpiModel = {
  id: 1,
  performedGoal: performedGoalMock,
  kpi: kpiMock,
  ratingManager: ratingMock,
  achieved: 'meta alcançada',
  midFeedbackUser: 'mid feedback user',
  midFeedbackManager: 'mid feedback manager',
  endFeedbackManager: 'end feedback manager',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  calcGrade() {
    return
  }
}

export default performedGoalKpiMock
