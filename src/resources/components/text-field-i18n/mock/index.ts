import { TextFieldLocaleModel } from '@components/text-field-i18n/entities/text-field-i18n.entity'
import textFieldMock from '@components/text-field/mock'
import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'

const textFieldLocaleMock: TextFieldLocaleModel = {
  id: 1,
  textField: textFieldMock,
  locale: LOCALES.BR,
  labelPlaceholder: 'Label placeholder',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default textFieldLocaleMock
