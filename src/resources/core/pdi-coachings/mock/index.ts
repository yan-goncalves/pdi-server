import { PDI_COACHING_CATEGORY } from '@constants/pdi'
import faker from '@faker-js/faker'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PdiCoachingModel } from 'src/resources/core/pdi-coachings/entities/pdi-coaching.entity'

const pdiCoachingMock: PdiCoachingModel = {
  id: 1,
  performed: performedEvaluationMock,
  category: PDI_COACHING_CATEGORY.CAREER,
  action: 'action',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default pdiCoachingMock
