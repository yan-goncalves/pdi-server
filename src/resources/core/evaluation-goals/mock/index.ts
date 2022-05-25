import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import evaluationMock from '@evaluations/mock'
import faker from '@faker-js/faker'
import goalMock from '@goals/mock'
import userMock from '@users/mock'

const evaluationGoalMock: EvaluationGoalModel = {
  id: 1,
  evaluation: evaluationMock,
  user: userMock(),
  goal: goalMock,
  kpis: [],
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default evaluationGoalMock
