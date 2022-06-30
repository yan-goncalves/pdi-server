import { CurrentUser, CurrentUserType } from '@decorators/current-user.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import {
  Controller,
  Delete,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('picture'))
  @Post('picture')
  async uploadPicture(
    @CurrentUser(CurrentUserType.REST) { id }: UserModel,
    @UploadedFile() picture: Express.Multer.File
  ): Promise<void> {
    return await this.service.setHasPicture(id, picture.filename)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('picture')
  async removePicture(@CurrentUser(CurrentUserType.REST) { id }: UserModel): Promise<boolean> {
    return await this.service.removePicture(id)
  }
}
