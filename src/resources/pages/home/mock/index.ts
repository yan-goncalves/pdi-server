import buttonMock from '@components/button/mock'
import faker from '@faker-js/faker'
import mediaMock from '@medias/mock'
import homeLocaleMock from '@pages/home-i18n/mock'
import { HomeModel } from '@pages/home/entities/home.entity'

const homeMock: HomeModel = {
  id: 1,
  title: 'Title',
  description: 'description',
  hero: mediaMock,
  button: buttonMock,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: homeLocaleMock
}

export default homeMock
