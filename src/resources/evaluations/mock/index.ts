import { EVALUATION_PERIOD } from '@constants/evaluations'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import faker from '@faker-js/faker'

const evaluationMock: EvaluationModel = {
  id: 1,
  period: EVALUATION_PERIOD.OUT,
  year: 2022,
  midDate: {
    start: new Date(),
    deadline: new Date()
  },
  endDate: {
    start: new Date(),
    deadline: new Date()
  },
  finished: false,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default evaluationMock
