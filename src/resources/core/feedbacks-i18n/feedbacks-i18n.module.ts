import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedbackLocaleModel } from '@feedbacks-i18n/entities/feedback-i18n.entity'
import { FeedbacksI18nService } from '@feedbacks-i18n/feedbacks-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackLocaleModel])],
  providers: [FeedbacksI18nService],
  exports: [FeedbacksI18nService]
})
export class FeedbacksI18nModule {}
