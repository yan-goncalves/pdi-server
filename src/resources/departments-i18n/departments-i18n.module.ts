import { DepartmentsI18nService } from '@departments-i18n/departments-i18n.service'
import { DepartmentLocaleModel } from '@departments-i18n/entities/department-i18n.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentLocaleModel])],
  providers: [DepartmentsI18nService],
  exports: [DepartmentsI18nService]
})
export class DepartmentsI18nModule {}
