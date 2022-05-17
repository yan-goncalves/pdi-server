import { AppModule } from '@appModule'
import { AppDataSource } from '@data-source'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap(): Promise<void> {
  await AppDataSource.initialize()
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  await app
    .listen(process.env.PORT || 3030)
    .then(() => logger.log(`Listening on port ${process.env.PORT || 3030}`, 'NestApplication'))
}
bootstrap()
