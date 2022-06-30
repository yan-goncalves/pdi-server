import { ButtonModule } from '@components/button/button.module'
import { TextFieldModule } from '@components/text-field/text-field.module'
import { ForbiddenException, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SignInI18nModule } from '@pages/sign-in-i18n/sign-in-i18n.module'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'
import { SignInController } from '@pages/sign-in/sign-in.controller'
import { SignInResolver } from '@pages/sign-in/sign-in.resolver'
import { SignInService } from '@pages/sign-in/sign-in.service'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
    TypeOrmModule.forFeature([SignInModel]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('MULTER_DEST') + '/pages/signin',
          filename: async (_, file, callback) =>
            callback(null, `signin${extname(file.originalname)}`)
        }),
        fileFilter: function (_, file, cb): void {
          const allowed = ['image/jpeg', 'image/png', 'image/svg+xml']
          if (!allowed.includes(file.mimetype)) {
            throw new ForbiddenException('Only images (.jpeg, .jpg, .png, .svg) are allowed')
          }

          // file. size > 2MB
          if (file.size > 2000000) {
            throw new ForbiddenException('File size exceeds maximum limit 2MB')
          }

          cb(null, true)
        }
      })
    }),
    SignInI18nModule,
    ButtonModule,
    TextFieldModule
  ],
  providers: [SignInResolver, SignInService],
  controllers: [SignInController],
  exports: [SignInService]
})
export class SignInModule {}
