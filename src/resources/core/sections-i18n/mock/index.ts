import { LOCALES } from '@constants/locales'
import { faker } from '@faker-js/faker'
import { SectionLocaleModel } from '@sections-i18n/entities/sections-i18n.entity'
import sectionMock from '@sections/mock'

const sectionLocaleMock: SectionLocaleModel = {
  id: 1,
  section: sectionMock,
  locale: LOCALES.BR,
  title: 'Questões Iniciais',
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: faker.date.recent({ days: 1 })
}

export default sectionLocaleMock
