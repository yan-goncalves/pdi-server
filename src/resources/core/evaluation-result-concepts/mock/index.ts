import { EVALUATION_RESULT_CONCEPT_COLORS } from '@constants/evaluations'
import evaluationResultConceptLocaleMock from '@evaluation-result-concepts-i18n/mock'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
import faker from '@faker-js/faker'

const evaluationResultConceptMock: EvaluationResultConceptModel = {
  id: 1,
  concept: 'A',
  description: 'Description',
  color: EVALUATION_RESULT_CONCEPT_COLORS.BLUE,
  min: 0.5,
  max: 2.0,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: evaluationResultConceptLocaleMock
}

export default evaluationResultConceptMock
