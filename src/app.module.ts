import { Module } from '@nestjs/common'
import { UsersModule } from './resources/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersInfoModule } from './resources/users-info/users-info.module'
import { LdapModule } from '@ldap/ldap.module'

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
        host: configService.get('TYPEORM_HOST', 'SLBR064'),
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
    }),
    LdapModule,
    UsersModule,
    UsersInfoModule
  ]
})
export class AppModule {}
