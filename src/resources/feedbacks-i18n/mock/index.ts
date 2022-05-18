import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { FeedbackLocaleModel } from '@feedbacks-i18n/entities/feedback-i18n.entity'
import feedbackMock from '@feedbacks/mock'

const feedbackLocaleMock: FeedbackLocaleModel = {
  id: 1,
  feedback: feedbackMock,
  locale: LOCALES.BR,
  inquire: 'change me',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default feedbackLocaleMock
