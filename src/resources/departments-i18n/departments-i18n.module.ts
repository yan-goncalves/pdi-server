import { Module } from '@nestjs/common'
import { DepartmentsI18nService } from '@departments-i18n/departments-i18n.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentLocaleModel } from './entities/departments-i18n.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentLocaleModel])],
  providers: [DepartmentsI18nService],
  exports: [DepartmentsI18nService]
})
export class DepartmentsI18nModule {}
