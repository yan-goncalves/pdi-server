import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedbacksI18nModule } from '@feedbacks-i18n/feedbacks-i18n.module'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import { FeedbacksResolver } from '@feedbacks/feedbacks.resolver'
import { FeedbacksService } from '@feedbacks/feedbacks.service'

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackModel]), FeedbacksI18nModule],
  providers: [FeedbacksResolver, FeedbacksService],
  exports: [FeedbacksService]
})
export class FeedbacksModule {}
