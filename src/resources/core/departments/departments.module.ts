import { DepartmentsI18nModule } from '@departments-i18n/departments-i18n.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentsResolver } from 'src/resources/core/departments/departments.resolver'
import { DepartmentsService } from 'src/resources/core/departments/departments.service'
import { DepartmentModel } from 'src/resources/core/departments/entities/department.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentModel]), DepartmentsI18nModule],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
