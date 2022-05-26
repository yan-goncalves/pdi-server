import { EvaluationGoalKpiModel } from '@evaluations-goals-kpis/entities/evaluation-goal-kpi.entity'
import evaluationGoalMock from '@evaluations-goals/mock'
import faker from '@faker-js/faker'
import kpiMock from '@kpis/mock'

const evaluationGoalKpiMock: EvaluationGoalKpiModel = {
  id: 1,
  evaluationGoal: evaluationGoalMock,
  kpi: kpiMock,
  target: 'target',
  weight: 50,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default evaluationGoalKpiMock
