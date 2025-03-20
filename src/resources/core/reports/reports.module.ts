import { EvaluationsModule } from '@core/evaluations/evaluations.module'
import { FeedbacksI18nModule } from '@core/feedbacks-i18n/feedbacks-i18n.module'
import { GoalsModule } from '@core/goals/goals.module'
import { QuestionsI18nModule } from '@core/questions-i18n/questions-i18n.module'
import { SkillsI18nModule } from '@core/skills-i18n/skills-i18n.module'
import { UsersModule } from '@core/users/users.module'
import { Module } from '@nestjs/common'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

@Module({
  imports: [
    PerformedEvaluationsModule,
    GoalsModule,
    UsersModule,
    EvaluationsModule,
    QuestionsI18nModule,
    SkillsI18nModule,
    FeedbacksI18nModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: []
})
export class ReportsModule {}
