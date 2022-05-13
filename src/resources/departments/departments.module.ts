import { Module } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { DepartmentsResolver } from './departments.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentModel } from './entities/department.entity'
import { DepartmentsI18nModule } from '../departments-i18n/departments-i18n.module'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentModel]), DepartmentsI18nModule],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService]
})
export class DepartmentsModule {}
