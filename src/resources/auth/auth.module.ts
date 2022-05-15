import { AuthResolver } from '@auth/auth.resolver'
import { AuthService } from '@auth/auth.service'
import { LdapModule } from '@ldap/ldap.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@strategies/jwt.strategy'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    LdapModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', '8VXWRVcPn5LO3DPQwQkgudbEG6EZ6Wc9L6dmJbxgSn4='),
        signOptions: {
          expiresIn: '1d'
        }
      })
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
