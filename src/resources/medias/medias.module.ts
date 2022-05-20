import { MediaModel } from '@medias/entities/media.entity'
import { MediasResolver } from '@medias/medias.resolver'
import { MediasService } from '@medias/medias.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([MediaModel])],
  providers: [MediasResolver, MediasService],
  exports: [MediasService]
})
export class MediaModule {}
