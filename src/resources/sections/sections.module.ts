import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SectionsI18nModule } from '@sections-i18n/sections-i18n.module'
import { SectionModel } from '@sections/entities/section.entity'
import { SectionsResolver } from '@sections/sections.resolver'
import { SectionsService } from '@sections/sections.service'

@Module({
  imports: [TypeOrmModule.forFeature([SectionModel]), SectionsI18nModule],
  providers: [SectionsResolver, SectionsService],
  exports: [SectionsService]
})
export class SectionsModule {}
