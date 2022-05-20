import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeI18nModule } from '@pages/home-i18n/home-i18n.module'
import { HomeModel } from '@pages/home/entities/home.entity'
import { HomeResolver } from '@pages/home/home.resolver'
import { HomeService } from '@pages/home/home.service'

@Module({
  imports: [TypeOrmModule.forFeature([HomeModel]), HomeI18nModule],
  providers: [HomeResolver, HomeService],
  exports: [HomeService]
})
export class HomeModule {}
