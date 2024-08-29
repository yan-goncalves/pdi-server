import { AppModule } from '@appModule'
import { AppDataSource } from '@data-source'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestApplication, NestFactory } from '@nestjs/core'
import 'reflect-metadata'

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize()
  const logger = new Logger()
  const app = await NestFactory.create<NestApplication>(AppModule)
  const configService = app.get(ConfigService)

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
