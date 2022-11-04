import { LDAPUser } from '@ldap/dto/user.dto'
import { UserModelLDAP } from '@ldap/model/user.ldap.interface'
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client, DN } from 'ldapts'
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
  private readonly _URL_: string
  private readonly _DOMAIN_: string
  private readonly _ADM_USER_: string
  private readonly _ADM_PWD_: string

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this._URL_ = configService.get<string>('LDAP_URL')
    this._DOMAIN_ = configService.get<string>('LDAP_DOMAIN')
    this._ADM_USER_ = configService.get<string>('LDAP_ADMIN_CN')
    this._ADM_PWD_ = configService.get<string>('LDAP_ADMIN_PWD')

    this._CLIENT_ = new Client({ url: this._URL_ })

    this._BASE_DN_ = new DN({
      OU: ['SLBR_USERS'],
      DC: [this._DOMAIN_, 'local']
    })

    this._DN_ = `${this._ADM_USER_}@${this._DOMAIN_}`
  }

  async getAll(): Promise<UserModelLDAP[]> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const users = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      filter: `(&(objectClass=person)${this.excludeServiceUsers}`,
      attributes: [
        'sAMAccountName',
        'mail',
        'displayName',
        'department',
        'title',
        'manager',
        'directReports'
      ]
    })

    // const { readFileSync } = await import('fs')
    // const { join, resolve } = await import('path')

    // const mockDir = resolve(process.cwd(), 'src', 'resources', 'ldap', 'mock')
    // const rawdata = readFileSync(join(mockDir, 'ldap.json'), 'utf-8')
    // const entries = JSON.parse(rawdata).searchEntries

    // return entries.map((entry) => ({
    //   sAMAccountName: entry.sAMAccountName,
    //   mail: entry.mail,
    //   displayName: entry.displayName,
    //   department: entry.department,
    //   title: entry.title
    // }))

    return users.searchEntries.map((user) => this.sanitize(user))
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
      throw new UnauthorizedException(`Domain user '${user.username}' not found`)
    }

    const foundUser = result.searchEntries[0]

    await this._CLIENT_.bind(foundUser.dn, user.password).catch((Exception) => {
      throw new Exception('Incorrect password')
    })

    return foundUser
  }

  async getByRaw(filter: string): Promise<UserModelLDAP> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const result = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      sizeLimit: 1,
      attributes: [
        'sAMAccountName',
        'mail',
        'displayName',
        'department',
        'title',
        'manager',
        'directReports'
      ],
      filter: `CN=${filter.split(',')[0].split('CN=')[1]}`
    })

    if (result.searchEntries.length < 1) {
      return undefined
    }

    return this.sanitize(result.searchEntries[0])
  }

  async getByUsername(username: string): Promise<UserModelLDAP> {
    await this._CLIENT_.bind(this._DN_, this._ADM_PWD_)

    const result = await this._CLIENT_.search(this._BASE_DN_, {
      scope: 'one',
      sizeLimit: 1,
      attributes: [
        'sAMAccountName',
        'mail',
        'displayName',
        'department',
        'title',
        'manager',
        'directReports'
      ],
      filter: `(&(sAMAccountName=${username})${this.excludeServiceUsers})`
    })

    if (result.searchEntries.length < 1) {
      throw new NotFoundException(`User '${username}' not found`)
    }

    return this.sanitize(result.searchEntries[0])
  }

  private sanitize(entry: Entry): UserModelLDAP {
    const username = entry.sAMAccountName.toString().trim()
    const [name, ...lastname] = entry.displayName.toString().split(this.whitespace)
    const department = entry.department.toString().trim()
    const position = entry.title.toString().trim()
    const manager = entry.manager?.toString()
    const directReports = entry.directReports?.toString()

    return {
      username,
      name,
      lastname: lastname.join(' '),
      department,
      position,
      manager,
      directReports
    }
  }
}
