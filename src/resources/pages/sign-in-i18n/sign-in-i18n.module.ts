import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignInLocaleModel } from '@pages/sign-in-i18n/entities/sign-in-i18n.entity'
import { SignInI18nService } from '@pages/sign-in-i18n/sign-in-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([SignInLocaleModel])],
  providers: [SignInI18nService],
  exports: [SignInI18nService]
})
export class SignInI18nModule {}
