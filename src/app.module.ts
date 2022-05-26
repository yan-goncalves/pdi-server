import { AuthModule } from '@auth/auth.module'
import { AppDataSource } from '@data-source'
import { DepartmentsModule } from '@departments/departments.module'
import { EvaluationGoalsKpisModule } from '@evaluations-goals-kpis/evaluations-goals-kpis.module'
import { EvaluationGoalsModule } from '@evaluations-goals/evaluations-goals.module'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { FeedbacksModule } from '@feedbacks/feedbacks.module'
import { GoalsModule } from '@goals/goals.module'
import { KpisModule } from '@kpis/kpis.module'
import { LdapModule } from '@ldap/ldap.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local'
      // ignoreEnvFile: process.env.NODE_ENV !== 'production'
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: 'schema.gql',
        playground: configService.get<string>('NODE_ENV') !== 'production'
      })
    }),
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
    EvaluationGoalsModule,
    EvaluationGoalsKpisModule,
    PdiCoachingsModule,
    PdiCompetencesCategoriesModule,
    PdiQualitiesModule,
    RatingsModule,
    PerformedEvaluationsModule,
    PerformedQuestionsModule,
    PerformedSkillsModule,
    PerformedGoalsModule,
    PerformedGoalsKpisModule,
    PerformedFeedbacksModule
  ]
})
export class AppModule {}
