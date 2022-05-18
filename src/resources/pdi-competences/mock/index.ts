import { PDI_COACHING_CATEGORY } from '@constants/pdi'
import faker from '@faker-js/faker'
import { PdiCoachingModel } from '@pdi-coachings/entities/pdi-coaching.entity'
import performedEvaluationMock from '@performed-evaluations/mock'

const pdiCoachingMock: PdiCoachingModel = {
  id: 1,
  performed: performedEvaluationMock,
  category: PDI_COACHING_CATEGORY.CAREER,
  action: 'action',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default pdiCoachingMock
