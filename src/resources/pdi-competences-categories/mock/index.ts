import faker from '@faker-js/faker'
import pdiCompetenceCategoryLocaleMock from '@pdi-competences-categories-i18n/mock'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'

const pdiCompetenceCategoryMock: PdiCompetenceCategoryModel = {
  id: 1,
  name: 'name',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: pdiCompetenceCategoryLocaleMock
}

export default pdiCompetenceCategoryMock
