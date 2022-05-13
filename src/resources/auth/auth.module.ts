import { LdapModule } from '@ldap/ldap.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '@users/users.module'
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import AuthResolver from '@auth/auth.resolver'
import { AuthService } from '@auth/auth.service'

@Module({
  imports: [
    LdapModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '8VXWRVcPn5LO3DPQwQkgudbEG6EZ6Wc9L6dmJbxgSn4=',
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
