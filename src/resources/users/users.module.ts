import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { UsersResolver } from '@users/users.resolver'
import { UserModel } from '@users/entities/user.entity'
import { UsersInfoModule } from '@users-info/users-info.module'
import { LdapModule } from '@ldap/ldap.module'
import { DepartmentsModule } from '@departments/departments.module'
import { TypeOrmModule } from '@nestjs/typeorm'

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
