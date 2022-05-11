import { LDAPUser } from '@ldap/dto/user.dto'
import { LdapService } from '@ldap/ldap.service'
import { UserModelLDAP } from '@ldap/model/user.ldap.interface'
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { SearchResult } from 'ldapts'
import { Entry } from 'ldapts/messages'

@Controller('ldap')
export class LdapController {
  constructor(private readonly ldapService: LdapService) {}

  @Get()
  async getAll(): Promise<SearchResult> {
    return await this.ldapService.getAll()
  }

  @Post()
  @UsePipes(ValidationPipe)
  async auth(@Body('user') user: LDAPUser): Promise<Entry> {
    return await this.ldapService.auth(user)
  }

  @Get(':username')
  async get(@Param('username') username: string): Promise<UserModelLDAP> {
    return await this.ldapService.getByUsername(username)
  }
}
