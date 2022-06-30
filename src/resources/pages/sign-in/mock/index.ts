import buttonMock from '@components/button/mock'
import textFieldMock from '@components/text-field/mock'
import faker from '@faker-js/faker'
import signInLocaleMock from '@pages/sign-in-i18n/mock'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'

const signInMock: SignInModel = {
  id: 1,
  title: 'Title',
  caption: 'Caption',
  logo: 'logo.svg',
  usernameTextField: textFieldMock,
  passwordTextField: textFieldMock,
  button: buttonMock,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: signInLocaleMock
}

export default signInMock
