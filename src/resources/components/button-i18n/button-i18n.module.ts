import { ButtonI18nService } from '@components/button-i18n/button-i18n.service'
import { ButtonLocaleModel } from '@components/button-i18n/entities/button-i18n.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ButtonLocaleModel])],
  providers: [ButtonI18nService],
  exports: [ButtonI18nService]
})
export class ButtonI18nModule {}
