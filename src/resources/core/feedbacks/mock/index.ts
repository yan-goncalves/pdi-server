import { faker } from '@faker-js/faker'
import feedbackLocaleMock from '@feedbacks-i18n/mock'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'

const feedbackMock: FeedbackModel = {
  id: 1,
  inquire: 'inquire?',
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 }),
  locale: feedbackLocaleMock
}

export default feedbackMock
