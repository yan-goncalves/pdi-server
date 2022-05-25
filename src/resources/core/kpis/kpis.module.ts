import { KpiModel } from '@kpis/entities/kpi.entity'
import { KpisResolver } from '@kpis/kpis.resolver'
import { KpisService } from '@kpis/kpis.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([KpiModel]), UsersModule],
  providers: [KpisResolver, KpisService],
  exports: [KpisService]
})
export class KpisModule {}
