import { QUESTION_REPLY } from '@constants/performed'
import faker from '@faker-js/faker'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import questionMock from '@questions/mock'

const performedQuestionMock: PerformedQuestionModel = {
  id: 1,
  performed: performedEvaluationMock,
  question: questionMock,
  reply: QUESTION_REPLY.YES,
  justification: 'justification',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedQuestionMock
