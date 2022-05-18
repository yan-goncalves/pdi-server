import evaluationMock from '@evaluations/mock'
import faker from '@faker-js/faker'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import userMock from '@users/mock'

const performedEvaluationMock: PerformedEvaluationModel = {
  id: 1,
  evaluation: evaluationMock,
  user: userMock(),
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedEvaluationMock
