import { faker } from '@faker-js/faker'
import ratingLocaleMock from '@ratings-i18n/mock'
import { RatingModel } from '@ratings/entities/rating.entity'

const ratingMock: RatingModel = {
  id: 1,
  description: 'Description',
  value: 1,
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 }),
  locale: ratingLocaleMock
}

export default ratingMock
