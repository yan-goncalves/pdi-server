import { AuthModule } from '@auth/auth.module'
import { DepartmentsModule } from '@departments/departments.module'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { LdapModule } from '@ldap/ldap.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('TYPEORM_HOST', 'localhost'),
        database: configService.get('TYPEORM_DATABASE', 'PDI'),
        username: configService.get('TYPEORM_USERNAME', 'pdi'),
        password: configService.get('TYPEORM_PASSWORD', '1@asdfgPDI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        requestTimeout: 60 * 1000,
        autoLoadEntities: true,
        options: {
          encrypt: false,
          enableArithAbort: true
        },
        logging: configService.get('NODE_ENV') !== 'production',
        synchronize: configService.get('NODE_ENV') !== 'production',
        migrationsRun: configService.get('NODE_ENV') === 'production'
      })
    }),
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
    EvaluationsModule
  ]
})
export class AppModule {}
