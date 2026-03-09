import { faker } from '@faker-js/faker'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'

const pdiCompetenceCategoryMock: PdiCompetenceCategoryModel = {
  id: 1,
  name: 'name',
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 })
}

export default pdiCompetenceCategoryMock
