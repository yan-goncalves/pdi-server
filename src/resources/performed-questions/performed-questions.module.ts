import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import { PerformedQuestionsResolver } from '@performed-questions/performed-questions.resolver'
import { PerformedQuestionsService } from '@performed-questions/performed-questions.service'

@Module({
  imports: [TypeOrmModule.forFeature([PerformedQuestionModel])],
  providers: [PerformedQuestionsResolver, PerformedQuestionsService],
  exports: [PerformedQuestionsService]
})
export class PerformedQuestionsModule {}
