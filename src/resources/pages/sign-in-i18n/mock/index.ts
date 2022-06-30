import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { SignInLocaleModel } from '@pages/sign-in-i18n/entities/sign-in-i18n.entity'
import signInMock from '@pages/sign-in/mock'

const signInLocaleMock: SignInLocaleModel = {
  id: 1,
  signIn: signInMock,
  locale: LOCALES.BR,
  title: 'Title',
  caption: 'Caption',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default signInLocaleMock
