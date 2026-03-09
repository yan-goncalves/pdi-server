import { ButtonLocaleModel } from '@components/button-i18n/entities/button-i18n.entity'
import buttonMock from '@components/button/mock'
import { LOCALES } from '@constants/locales'
import { faker } from '@faker-js/faker'

const buttonLocaleMock: ButtonLocaleModel = {
  id: 1,
  button: buttonMock,
  locale: LOCALES.BR,
  label: 'label',
  loadingLabel: 'loading label',
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 })
}

export default buttonLocaleMock
