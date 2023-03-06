import { DepartmentsI18nModule } from '@core/departments-i18n/departments-i18n.module'
import { DepartmentsModule } from '@core/departments/departments.module'
import { EvaluationsModule } from '@core/evaluations/evaluations.module'
import { LdapModule } from '@core/ldap/ldap.module'
import { PerformedEvaluationsModule } from '@core/performed-evaluations/performed-evaluations.module'
import { UsersModule } from '@core/users/users.module'
import { Module } from '@nestjs/common'
import { CronsService } from './crons.service'

@Module({
  imports: [
    UsersModule,
    LdapModule,
    DepartmentsModule,
    DepartmentsI18nModule,
    EvaluationsModule,
    PerformedEvaluationsModule
  ],
  providers: [CronsService]
})
export class CronsModule {}
