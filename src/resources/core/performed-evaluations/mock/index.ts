import pdiCoachingMock from '@core/pdi-coachings/mock'
import pdiCompetenceMock from '@core/pdi-competences/mock'
import pdiQualityMock from '@core/pdi-qualities/mock'
import evaluationMock from '@evaluations/mock'
import faker from '@faker-js/faker'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import performedFeedbackMock from '@performed-feedbacks/mock'
import performedGoalMock from '@performed-goals/mock'
import performedQuestionMock from '@performed-questions/mock'
import performedSkillMock from '@performed-skills/mock'
import userMock from '@users/mock'

const performedEvaluationMock: PerformedEvaluationModel = {
  id: 1,
  evaluation: evaluationMock,
  user: userMock(),
  grade: 2.11,
  midFinished: false,
  endFinished: false,
  createdAt: faker.date.past(1),
  updatedAt: faker.date.recent(1),
  questions: [performedQuestionMock],
  skills: [performedSkillMock],
  goals: [performedGoalMock],
  feedbacks: [performedFeedbackMock],
  pdiCoaching: [pdiCoachingMock],
  pdiCompetence: [pdiCompetenceMock],
  pdiQuality: [pdiQualityMock]
}

export default performedEvaluationMock
