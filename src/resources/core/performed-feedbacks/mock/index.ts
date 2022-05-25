import faker from '@faker-js/faker'
import feedbackMock from '@feedbacks/mock'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PerformedFeedbackModel } from '@performed-feedbacks/entities/performed-feedback.entity'

const performedFeedbackMock: PerformedFeedbackModel = {
  id: 1,
  performed: performedEvaluationMock,
  feedback: feedbackMock,
  midReply: 'mid reply',
  endReply: 'end reply',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedFeedbackMock
