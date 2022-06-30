import { ButtonModule } from '@components/button/button.module'
import { MediaModule } from '@medias/medias.module'
import { ForbiddenException, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeI18nModule } from '@pages/home-i18n/home-i18n.module'
import { HomeModel } from '@pages/home/entities/home.entity'
import { HomeController } from '@pages/home/home.controller'
import { HomeResolver } from '@pages/home/home.resolver'
import { HomeService } from '@pages/home/home.service'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeModel]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('MULTER_DEST') + '/pages/home',
          filename: async (_, file, callback) => callback(null, `home${extname(file.originalname)}`)
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
    HomeI18nModule,
    MediaModule,
    ButtonModule
  ],
  controllers: [HomeController],
  providers: [HomeResolver, HomeService],
  exports: [HomeService]
})
export class HomeModule {}
