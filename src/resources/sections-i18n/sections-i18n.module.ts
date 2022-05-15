import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SectionLocaleModel } from '@sections-i18n/entities/sections-i18n.entity'
import { SectionsI18nService } from '@sections-i18n/sections-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([SectionLocaleModel])],
  providers: [SectionsI18nService],
  exports: [SectionsI18nService]
})
export class SectionsI18nModule {}
