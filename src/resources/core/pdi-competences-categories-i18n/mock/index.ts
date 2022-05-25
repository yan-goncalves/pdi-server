import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { PdiCompetenceCategoryLocaleModel } from '@pdi-competences-categories-i18n/entities/pdi-competence-category-i18n.entity'
import pdiCompetenceCategoryMock from '@pdi-competences-categories/mock'

const pdiCompetenceCategoryLocaleMock: PdiCompetenceCategoryLocaleModel = {
  id: 1,
  pdiCompetenceCategory: pdiCompetenceCategoryMock,
  locale: LOCALES.BR,
  name: 'name',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default pdiCompetenceCategoryLocaleMock
