import { ComponentsModule } from '@components/components.module'
import { CoreModule } from '@core/core.module'
import { AppDataSource } from '@data-source'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PagesModule } from '@pages/pages.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local'
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
    ScheduleModule.forRoot(),
    CoreModule,
    ComponentsModule,
    PagesModule
  ]
})
export class AppModule {}
