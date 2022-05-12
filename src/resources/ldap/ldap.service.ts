import { LDAPUser } from '@ldap/dto/user.dto'
import { UserModelLDAP } from '@ldap/model/user.ldap.interface'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Client, DN, SearchResult } from 'ldapts'
import { Entry } from 'ldapts/messages'

@Injectable()
export class LdapService {
  private readonly whitespace = ' '
  private readonly excludeServiceUsers =
    '(!(sAMaccountName=bkpexec))' +
    '(!(sAMaccountName=GTM))' +
    '(!(sAMaccountName=JIS))' +
    '(!(sAMaccountName=scanner))'

  private readonly _CLIENT_: Client
  private readonly _BASE_DN_: DN
  private readonly _DN_: string
  private readonly _URL_ = process.env.LDAP_URL
  private readonly _DOMAIN_ = process.env.LDAP_DOMAIN
  private readonly _ADM_USER_ = process.env.LDAP_ADMIN_CN
  private readonly _ADM_PWD_ = process.env.LDAP_ADMIN_PWD

  constructor() {
    this._CLIENT_ = new Client({ url: this._URL_ })

    this._BASE_DN_ = new DN({
      OU: ['SLBR_USERS'],
      DC: [this._DOMAIN_, 'local']
    })

    this._DN_ = `${this._ADM_USER_}@${this._DOMAIN_}`
  }

  async getAll(): Promise<SearchResult> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const users = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      filter: `(&(objectClass=person)${this.excludeServiceUsers}`,
      attributes: ['sAMAccountName', 'mail', 'displayName', 'department', 'title']
    })

    const { readFileSync } = await import('fs')
    const { join, resolve } = await import('path')

    const mockDir = resolve(process.cwd(), 'src', 'resources', 'ldap', 'mock')
    const rawdata = readFileSync(join(mockDir, 'ldap.json'), 'utf-8')
    const entries = JSON.parse(rawdata).searchEntries

    return entries.map((entry) => ({
      sAMAccountName: entry.sAMAccountName,
      mail: entry.mail,
      displayName: entry.displayName,
      department: entry.department,
      title: entry.title
    }))

    // return users
  }

  async auth(user: LDAPUser): Promise<Entry> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const result = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      sizeLimit: 1,
      attributes: ['dn'],
      filter: `(&(sAMAccountName=${user.username})${this.excludeServiceUsers})`
    })

    if (result.searchEntries.length < 1) {
      throw new UnauthorizedException(`Usuário '${user.username}' não encontrado no domínio`)
    }

    const foundUser = result.searchEntries[0]

    await this._CLIENT_.bind(foundUser.dn, user.password).catch((Exception) => {
      throw new Exception(`Senha incorreta`)
    })

    return foundUser
  }

  async getByUsername(username: string): Promise<UserModelLDAP> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const result = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      sizeLimit: 1,
      attributes: ['displayName', 'department', 'title'],
      filter: `(&(sAMAccountName=${username})${this.excludeServiceUsers})`
    })

    if (result.searchEntries.length < 1) {
      throw new NotFoundException(`Usuário '${username}' não encontrado`)
    }

    const [name, lastname] = result.searchEntries[0].displayName.toString().split(this.whitespace)
    const department = result.searchEntries[0].department.toString()
    const role = result.searchEntries[0].title.toString()

    return {
      name,
      lastname,
      department,
      position: role
    }
  }
}
