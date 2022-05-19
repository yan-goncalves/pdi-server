import { AuthModule } from '@auth/auth.module'
import { AppDataSource } from '@data-source'
import { DepartmentsModule } from '@departments/departments.module'
import { EvaluationGoalsKpisModule } from '@evaluation-goals-kpis/evaluation-goals-kpis.module'
import { EvaluationGoalsModule } from '@evaluation-goals/evaluation-goals.module'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { FeedbacksModule } from '@feedbacks/feedbacks.module'
import { GoalsModule } from '@goals/goals.module'
import { KpisModule } from '@kpis/kpis.module'
import { LdapModule } from '@ldap/ldap.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCoachingsModule } from '@pdi-coachings/pdi-coachings.module'
import { PdiCompetencesCategoriesModule } from '@pdi-competences-categories/pdi-competences-categories.module'
import { PdiQualitiesModule } from '@pdi-qualities/pdi-qualities.module'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { QuestionsModule } from '@questions/questions.module'
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
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mssql',
    //     host: configService.get('TYPEORM_HOST', 'localhost'),
    //     database: configService.get('TYPEORM_DATABASE', 'PDI'),
    //     username: configService.get('TYPEORM_USERNAME', 'pdi'),
    //     password: configService.get('TYPEORM_PASSWORD', '1@asdfgPDI'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     requestTimeout: 60 * 1000,
    //     autoLoadEntities: true,
    //     options: {
    //       encrypt: false,
    //       enableArithAbort: true
    //     },
    //     logging: configService.get('NODE_ENV') !== 'production',
    //     synchronize: configService.get('NODE_ENV') !== 'production',
    //     migrationsRun: configService.get('NODE_ENV') === 'production'
    //   })
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true
      // context: ({ req }) => ({ req })
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
    PerformedEvaluationsModule,
    PdiCoachingsModule,
    PdiCompetencesCategoriesModule,
    PdiQualitiesModule
  ]
})
export class AppModule {}
