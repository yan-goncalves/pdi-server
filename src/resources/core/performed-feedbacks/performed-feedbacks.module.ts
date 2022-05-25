import { FeedbacksModule } from '@feedbacks/feedbacks.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedFeedbackModel } from '@performed-feedbacks/entities/performed-feedback.entity'
import { PerformedFeedbacksResolver } from '@performed-feedbacks/performed-feedbacks.resolver'
import { PerformedFeedbacksService } from '@performed-feedbacks/performed-feedbacks.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedFeedbackModel]),
    PerformedEvaluationsModule,
    FeedbacksModule
  ],
  providers: [PerformedFeedbacksResolver, PerformedFeedbacksService],
  exports: [PerformedFeedbacksService]
})
export class PerformedFeedbacksModule {}
