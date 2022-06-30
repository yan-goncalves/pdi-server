import { TextFieldLocaleModel } from '@components/text-field-i18n/entities/text-field-i18n.entity'
import { TextFieldI18nService } from '@components/text-field-i18n/text-field-i18n.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([TextFieldLocaleModel])],
  providers: [TextFieldI18nService],
  exports: [TextFieldI18nService]
})
export class TextFieldI18nModule {}
