import evaluationGoalKpiMock from '@evaluation-goals-kpis/mock'
import faker from '@faker-js/faker'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import ratingMock from '@ratings/mock'

const performedGoalKpiMock: PerformedGoalKpiModel = {
  id: 1,
  performed: performedEvaluationMock,
  evaluationGoalKpi: evaluationGoalKpiMock,
  ratingManager: ratingMock,
  achieved: 10,
  midFeedbackUser: 'mid feedback user',
  midFeedbackManager: 'mid feedback manager',
  endFeedbackManager: 'end feedback manager',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedGoalKpiMock
