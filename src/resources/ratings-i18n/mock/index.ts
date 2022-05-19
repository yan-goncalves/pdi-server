import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { RatingLocaleModel } from '@ratings-i18n/entities/rating-i18n.entity'
import ratingMock from '@ratings/mock'

const ratingLocaleMock: RatingLocaleModel = {
  id: 1,
  rating: ratingMock,
  locale: LOCALES.BR,
  description: 'Description',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default ratingLocaleMock
