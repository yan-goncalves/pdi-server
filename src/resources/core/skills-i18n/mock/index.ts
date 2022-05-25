import { LOCALES } from '@constants/locales'
import faker from '@faker-js/faker'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-18n.entity'
import skillsMock from '@skills/mock'

const skillsLocaleMock: SkillLocaleModel = {
  id: 1,
  skill: skillsMock,
  title: 'Qualidade',
  description: 'Por favor avalie o grau de perfeição com que você executa suas funções',
  locale: LOCALES.BR,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default skillsLocaleMock
