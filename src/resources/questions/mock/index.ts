import faker from '@faker-js/faker'
import questionLocaleMock from '@questions-i18n/mock'
import { QuestionModel } from '@questions/entities/question.entity'

const questionMock: QuestionModel = {
  id: 1,
  ask: 'Você aceitaria a hipótese de trabalhar em outra localidade no Brasil?',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: questionLocaleMock
}

export default questionMock
