import { faker } from '@faker-js/faker'
import pdiCompetenceCategoryMock from '@pdi-competences-categories/mock'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import performedEvaluationMock from '@performed-evaluations/mock'

const pdiCompetenceMock: PdiCompetenceModel = {
  id: 1,
  performed: performedEvaluationMock,
  category: pdiCompetenceCategoryMock,
  name: 'name',
  action: 'action',
  deadline: faker.date.past({ years: 10 }),
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 })
}

export default pdiCompetenceMock
