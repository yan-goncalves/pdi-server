import { ButtonI18nModule } from '@components/button-i18n/button-i18n.module'
import { ButtonResolver } from '@components/button/button.resolver'
import { ButtonService } from '@components/button/button.service'
import { ButtonModel } from '@components/button/entities/button.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ButtonModel]), ButtonI18nModule],
  providers: [ButtonResolver, ButtonService],
  exports: [ButtonService]
})
export class ButtonModule {}
