import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { UsersInfoResolver } from '@users-info/users-info.resolver'
import { UsersInfoService } from '@users-info/users-info.service'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([UsersInfoModel]), forwardRef(() => UsersModule)],
  providers: [UsersInfoResolver, UsersInfoService],
  exports: [UsersInfoService]
})
export class UsersInfoModule {}
