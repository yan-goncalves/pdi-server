import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingLocaleModel } from '@ratings-i18n/entities/rating-i18n.entity'
import { RatingsI18nService } from '@ratings-i18n/ratings-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([RatingLocaleModel])],
  providers: [RatingsI18nService],
  exports: [RatingsI18nService]
})
export class RatingsI18nModule {}
