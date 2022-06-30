import { ROLES } from '@constants/roles'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { Controller, Inject, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { HomeService } from '@pages/home/home.service'

@Controller('uploads/pages/home')
export class HomeController {
  constructor(@Inject(HomeService) private readonly service: HomeService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('image')
  async setHomeImage(@UploadedFile() image: Express.Multer.File): Promise<void> {
    return await this.service.setImage(`${image.destination}/${image.filename}`)
  }
}
