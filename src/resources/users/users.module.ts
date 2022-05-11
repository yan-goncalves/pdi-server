import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from './entities/user.entity'
import { UsersInfoModule } from '@users-info/users-info.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), forwardRef(() => UsersInfoModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
