import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { EvaluationResultConceptLocaleModel } from '@evaluation-result-concepts-i18n/entities/evaluation-result-concept-i18n.entity'
import evaluationResultConceptMock from '@evaluation-result-concepts/mock'

const evaluationResultConceptLocaleMock: EvaluationResultConceptLocaleModel = {
  id: 1,
  evaluationResultConcept: evaluationResultConceptMock,
  locale: LOCALES.BR,
  description: 'Description',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default evaluationResultConceptLocaleMock
