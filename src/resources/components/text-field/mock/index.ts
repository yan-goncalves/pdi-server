import textFieldLocaleMock from '@components/text-field-i18n/mock'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import faker from '@faker-js/faker'

const textFieldMock: TextFieldModel = {
  id: 1,
  labelPlaceholder: 'Label placeholder',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: textFieldLocaleMock
}

export default textFieldMock
