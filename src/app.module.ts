import { Module } from '@nestjs/common'
import { UsersModule } from '@users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersInfoModule } from '@users-info/users-info.module'
import { LdapModule } from '@ldap/ldap.module'
import { DepartmentsModule } from '@departments/departments.module'
import { AuthModule } from '@auth/auth.module'

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
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req })
    }),
    LdapModule,
    AuthModule,
    UsersModule,
    UsersInfoModule,
    DepartmentsModule
  ]
})
export class AppModule {}
