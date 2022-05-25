import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import { PerformedQuestionsResolver } from '@performed-questions/performed-questions.resolver'
import { PerformedQuestionsService } from '@performed-questions/performed-questions.service'
import { QuestionsModule } from '@questions/questions.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedQuestionModel]),
    PerformedEvaluationsModule,
    QuestionsModule
  ],
  providers: [PerformedQuestionsResolver, PerformedQuestionsService],
  exports: [PerformedQuestionsService]
})
export class PerformedQuestionsModule {}
