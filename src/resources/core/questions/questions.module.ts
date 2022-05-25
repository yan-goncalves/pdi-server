import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionsI18nModule } from '@questions-i18n/questions-i18n.module'
import { QuestionModel } from '@questions/entities/question.entity'
import { QuestionsResolver } from '@questions/questions.resolver'
import { QuestionsService } from '@questions/questions.service'

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel]), QuestionsI18nModule],
  providers: [QuestionsResolver, QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
