import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-i18n.entity'
import skillsMock from '@skills/mock'

const skillsLocaleMock: SkillLocaleModel = {
  id: 1,
  Skill: skillsMock,
  locale: LOCALES.BR,
  changeMe: 'change me',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default skillsLocaleMock
