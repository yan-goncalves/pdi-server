import { AppModule } from '@appModule'
import { AppDataSource } from '@data-source'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import 'reflect-metadata'

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize()
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  await app
    .listen(configService.get<number>('PORT', 3030))
    .then(() =>
      logger.log(`Listening on port ${configService.get<number>('PORT', 3030)}`, 'NestApplication')
    )
}
bootstrap()
