import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeLocaleModel } from '@pages/home-i18n/entities/home-i18n.entity'
import { HomeI18nService } from '@pages/home-i18n/home-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([HomeLocaleModel])],
  providers: [HomeI18nService],
  exports: [HomeI18nService]
})
export class HomeI18nModule {}
