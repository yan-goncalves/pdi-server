import { AppModule } from '@appModule'
import { AppDataSource } from '@data-source'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestApplication, NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import 'reflect-metadata'

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize()
  const logger = new Logger()
  const app = await NestFactory.create<NestApplication>(AppModule)
  const configService = app.get(ConfigService)

  app.use(json({ limit: '8mb' }))
  app.use(urlencoded({ extended: true, limit: '8mb' }))

  app.enableCors()
  app.useStaticAssets(configService.get<string>('MULTER_DEST'), {
    index: false,
    prefix: '/uploads'
  })
  app.useGlobalPipes(new ValidationPipe())

  await app
    .listen(configService.get<number>('PORT', 3030))
    .then(() =>
      logger.log(
        `Listening on port ${configService.get<number>('PORT', 3030)}`,
        NestApplication.name
      )
    )
}
bootstrap()
