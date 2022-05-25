import { LdapModule } from '@ldap/ldap.module'
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersInfoModule } from '@users-info/users-info.module'
import { UserModel } from '@users/entities/user.entity'
import { UsersResolver } from '@users/users.resolver'
import { UsersService } from '@users/users.service'
import { DepartmentsModule } from 'src/resources/core/departments/departments.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    forwardRef(() => UsersInfoModule),
    LdapModule,
    DepartmentsModule
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
