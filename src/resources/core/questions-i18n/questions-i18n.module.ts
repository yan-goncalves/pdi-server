import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionLocaleModel } from '@questions-i18n/entities/questions-i18n.entity'
import { QuestionsI18nService } from '@questions-i18n/questions-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([QuestionLocaleModel])],
  providers: [QuestionsI18nService],
  exports: [QuestionsI18nService]
})
export class QuestionsI18nModule {}
