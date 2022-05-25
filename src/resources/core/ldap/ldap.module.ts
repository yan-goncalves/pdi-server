import { LdapController } from '@ldap/ldap.controller'
import { LdapService } from '@ldap/ldap.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  controllers: [LdapController],
  providers: [LdapService],
  exports: [LdapService]
})
export class LdapModule {}
