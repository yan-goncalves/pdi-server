import evaluationGoalMock from '@evaluation-goals/mock'
import faker from '@faker-js/faker'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'

const performedGoalMock: PerformedGoalModel = {
  id: 1,
  performed: performedEvaluationMock,
  evaluationGoal: evaluationGoalMock,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedGoalMock
