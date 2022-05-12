import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersResolver } from '@users/users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '@users/entities/user.entity'
import { UsersInfoModule } from '@users-info/users-info.module'
import { LdapModule } from '@ldap/ldap.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), forwardRef(() => UsersInfoModule), LdapModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
