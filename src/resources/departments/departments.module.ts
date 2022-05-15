import { DepartmentsI18nModule } from '@departments-i18n/departments-i18n.module'
import { DepartmentsResolver } from '@departments/departments.resolver'
import { DepartmentsService } from '@departments/departments.service'
import { DepartmentModel } from '@departments/entities/department.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentModel]), DepartmentsI18nModule],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
