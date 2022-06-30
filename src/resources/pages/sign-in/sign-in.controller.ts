import { ROLES } from '@constants/roles'
import { Roles } from '@decorators/roles.decorator'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { Controller, Inject, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { SignInService } from '@pages/sign-in/sign-in.service'

@Controller('uploads/pages/signin')
export class SignInController {
  constructor(@Inject(SignInService) private readonly service: SignInService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @Post('image')
  async setSignInImage(@UploadedFile() image: Express.Multer.File): Promise<void> {
    return await this.service.setImage(`${image.destination}/${image.filename}`)
  }
}
