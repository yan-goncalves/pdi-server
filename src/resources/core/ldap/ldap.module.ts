import { LdapController } from '@ldap/ldap.controller'
import { LdapService } from '@ldap/ldap.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [LdapController],
  providers: [LdapService],
  exports: [LdapService]
})
export class LdapModule {}
