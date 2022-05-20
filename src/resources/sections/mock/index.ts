import faker from '@faker-js/faker'
import questionMock from '@questions/mock'
import sectionLocaleMock from '@sections-i18n/mock'
import { SectionModel } from '@sections/entities/section.entity'
import skillMock from '@skills/mock'

const sectionMock: SectionModel = {
  id: 1,
  title: 'Questões Iniciais',
  visibility: {
    USER: true,
    MANAGER: true,
    COORDINATOR: true,
    DIRECTOR: true
  },
  questions: [questionMock],
  skills: [skillMock],
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: sectionLocaleMock
}

export default sectionMock
