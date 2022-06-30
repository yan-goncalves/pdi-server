import { TextFieldI18nModule } from '@components/text-field-i18n/text-field-i18n.module'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import { TextFieldResolver } from '@components/text-field/text-field.resolver'
import { TextFieldService } from '@components/text-field/text-field.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([TextFieldModel]), TextFieldI18nModule],
  providers: [TextFieldResolver, TextFieldService],
  exports: [TextFieldService]
})
export class TextFieldModule {}
