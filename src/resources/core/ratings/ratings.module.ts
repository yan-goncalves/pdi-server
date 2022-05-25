import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingsI18nModule } from '@ratings-i18n/ratings-i18n.module'
import { RatingModel } from '@ratings/entities/rating.entity'
import { RatingsResolver } from '@ratings/ratings.resolver'
import { RatingsService } from '@ratings/ratings.service'

@Module({
  imports: [TypeOrmModule.forFeature([RatingModel]), RatingsI18nModule],
  providers: [RatingsResolver, RatingsService],
  exports: [RatingsService]
})
export class RatingsModule {}
