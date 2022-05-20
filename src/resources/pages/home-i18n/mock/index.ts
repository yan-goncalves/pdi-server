import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { HomeLocaleModel } from '@pages/home-i18n/entities/home-i18n.entity'
import homeMock from '@pages/home/mock'

const homeLocaleMock: HomeLocaleModel = {
  id: 1,
  home: homeMock,
  locale: LOCALES.BR,
  title: 'title',
  description: 'description',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default homeLocaleMock
