import { AuthModule } from '@auth/auth.module'
import { DepartmentsModule } from '@departments/departments.module'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { FeedbacksModule } from '@feedbacks/feedbacks.module'
import { GoalsModule } from '@goals/goals.module'
import { KpisModule } from '@kpis/kpis.module'
import { LdapModule } from '@ldap/ldap.module'
import { MediaModule } from '@medias/medias.module'
import { Module } from '@nestjs/common'
import { PdiCoachingsModule } from '@pdi-coachings/pdi-coachings.module'
import { PdiCompetencesCategoriesModule } from '@pdi-competences-categories/pdi-competences-categories.module'
import { PdiQualitiesModule } from '@pdi-qualities/pdi-qualities.module'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedFeedbacksModule } from '@performed-feedbacks/performed-feedbacks.module'
import { PerformedGoalsKpisModule } from '@performed-goals-kpis/performed-goals-kpis.module'
import { PerformedGoalsModule } from '@performed-goals/performed-goals.module'
import { PerformedQuestionsModule } from '@performed-questions/performed-questions.module'
import { PerformedSkillsModule } from '@performed-skills/performed-skills.module'
import { QuestionsModule } from '@questions/questions.module'
import { RatingsModule } from '@ratings/ratings.module'
import { SectionsModule } from '@sections/sections.module'
import { SkillsModule } from '@skills/skills.module'
import { UsersInfoModule } from '@users-info/users-info.module'
import { UsersModule } from '@users/users.module'
import { EvaluationResultConceptsModule } from './evaluation-result-concepts/evaluation-result-concepts.module'
import { PdiCompetencesModule } from './pdi-competences/pdi-competences.module'
import { ReportsModule } from './reports/reports.module'

@Module({
  imports: [
    LdapModule,
    AuthModule,
    UsersModule,
    UsersInfoModule,
    DepartmentsModule,
    SectionsModule,
    QuestionsModule,
    SkillsModule,
    FeedbacksModule,
    EvaluationsModule,
    GoalsModule,
    KpisModule,
    PdiCoachingsModule,
    PdiCompetencesModule,
    PdiCompetencesCategoriesModule,
    PdiQualitiesModule,
    RatingsModule,
    PerformedEvaluationsModule,
    PerformedQuestionsModule,
    PerformedSkillsModule,
    PerformedGoalsModule,
    PerformedGoalsKpisModule,
    PerformedFeedbacksModule,
    MediaModule,
    EvaluationResultConceptsModule,
    ReportsModule
  ]
})
export class CoreModule {}
