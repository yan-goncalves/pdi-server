import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { QuestionLocaleModel } from '@questions-i18n/entities/questions-i18n.entity'
import questionMock from '@questions/mock'

const questionLocaleMock: QuestionLocaleModel = {
  id: 1,
  question: questionMock,
  locale: LOCALES.BR,
  ask: 'Você aceitaria a hipótese de trabalhar em outra localidade no Brasil?',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default questionLocaleMock
