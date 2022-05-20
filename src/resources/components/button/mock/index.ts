import buttonLocaleMock from '@components/button-i18n/mock'
import { ButtonModel } from '@components/button/entities/button.entity'
import faker from '@faker-js/faker'

const buttonMock: ButtonModel = {
  id: 1,
  label: 'label',
  loadingLabel: 'loading label',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: buttonLocaleMock
}

export default buttonMock
