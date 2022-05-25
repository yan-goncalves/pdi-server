import faker from '@faker-js/faker'
import skillsLocaleMock from '@skills-i18n/mock'
import { SkillModel } from '@skills/entities/skill.entity'

const skillMock: SkillModel = {
  id: 1,
  title: 'Qualidade',
  description: 'Por favor avalie o grau de perfeição com que você executa suas funções',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  locale: skillsLocaleMock
}

export default skillMock
