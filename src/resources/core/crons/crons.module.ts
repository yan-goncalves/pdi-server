import { DepartmentsI18nModule } from '@core/departments-i18n/departments-i18n.module'
import { DepartmentsModule } from '@core/departments/departments.module'
import { LdapModule } from '@core/ldap/ldap.module'
import { UsersModule } from '@core/users/users.module'
import { Module } from '@nestjs/common'
import { CronsService } from './crons.service'

@Module({
  imports: [UsersModule, LdapModule, DepartmentsModule, DepartmentsI18nModule],
  providers: [CronsService]
})
export class CronsModule {}
