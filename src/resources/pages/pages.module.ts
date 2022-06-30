import { Module } from '@nestjs/common'
import { HomeModule } from '@pages/home/home.module'
import { SignInModule } from '@pages/sign-in/sign-in.module'

@Module({
  imports: [HomeModule, SignInModule]
})
export class PagesModule {}
