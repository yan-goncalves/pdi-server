import { PDI_QUALITY_CATEGORY } from '@constants/pdi'
import faker from '@faker-js/faker'
import { PdiQualityModel } from '@pdi-qualities/entities/pdi-quality.entity'
import performedEvaluationMock from '@performed-evaluations/mock'

const pdiQualityMock: PdiQualityModel = {
  id: 1,
  performed: performedEvaluationMock,
  category: PDI_QUALITY_CATEGORY.STRENGTH,
  description: 'STRENGTH',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default pdiQualityMock
