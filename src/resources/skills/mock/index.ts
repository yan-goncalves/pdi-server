import faker from '@faker-js/faker'
import { SkillModel } from '@skills/entities/skill.entity'

const skillsMock: SkillModel = {
  id: 1,
  changeMe: 'change me',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default skillsMock
