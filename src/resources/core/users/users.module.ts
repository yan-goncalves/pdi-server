import { DepartmentsModule } from '@departments/departments.module'
import { LdapModule } from '@ldap/ldap.module'
import { ForbiddenException, forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersInfoModule } from '@users-info/users-info.module'
import { UserModel } from '@users/entities/user.entity'
import { UsersController } from '@users/users.controller'
import { UsersResolver } from '@users/users.resolver'
import { UsersService } from '@users/users.service'
import { Request } from 'express'
import { mkdirSync, readdirSync, unlinkSync } from 'fs'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserModel]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination(_, __, callback) {
            const destination = configService.get<string>('MULTER_DEST') + '/users/picture'
            try {
              readdirSync(destination).map((file) => unlinkSync(`${destination}/${file}`))
            } catch {
              mkdirSync(destination, { recursive: true })
            }

            callback(null, destination)
          },
          filename: async ({ user: { username } }: Request & { user: UserModel }, file, callback) =>
            callback(null, username + extname(file.originalname))
        }),
        fileFilter: function (_, file, cb): void {
          const allowed = ['image/jpeg', 'image/png']
          if (!allowed.includes(file.mimetype)) {
            throw new ForbiddenException('Only images (.jpeg, .jpg, .png) are allowed')
          }

          // file. size > 2MB
          if (file.size > 2000000) {
            throw new ForbiddenException('File size exceeds maximum limit 2MB')
          }

          cb(null, true)
        }
      })
    }),
    forwardRef(() => UsersInfoModule),
    LdapModule,
    DepartmentsModule
  ],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
