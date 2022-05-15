import faker from '@faker-js/faker'
import { SectionModel } from '@sections/entities/section.entity'

const sectionMock: SectionModel = {
  id: 1,
  title: 'Questões Iniciais',
  visibility: {
    User: true,
    Manager: true,
    Coordinator: true,
    Director: true
  },
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default sectionMock
