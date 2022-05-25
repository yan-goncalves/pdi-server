import faker from '@faker-js/faker'
import performedEvaluationMock from '@performed-evaluations/mock'
import { PerformedSkillModel } from '@performed-skills/entities/performed-skill.entity'
import ratingMock from '@ratings/mock'
import skillMock from '@skills/mock'

const performedSkillMock: PerformedSkillModel = {
  id: 1,
  performed: performedEvaluationMock,
  skill: skillMock,
  ratingUser: ratingMock,
  ratingManager: ratingMock,
  endFeedbackUser: 'end feedback user',
  midFeedbackManager: 'mid feedback manager',
  endFeedbackManager: 'end feedback manager',
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1)
}

export default performedSkillMock
