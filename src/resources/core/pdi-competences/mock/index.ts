import faker from '@faker-js/faker'
import pdiCompetenceCategoryMock from '@pdi-competences-categories/mock'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import performedEvaluationMock from '@performed-evaluations/mock'

const pdiCompetenceMock: PdiCompetenceModel = {
  id: 1,
  performed: performedEvaluationMock,
  category: pdiCompetenceCategoryMock,
  name: 'name',
  action: 'action',
  deadline: faker.date.past(10),
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default pdiCompetenceMock
