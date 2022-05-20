import { MediaInput } from '@medias/dto/media.input'
import { MediaModel } from '@medias/entities/media.entity'
import { MediasService } from '@medias/medias.service'
import { Inject } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => MediaModel)
export class MediasResolver {
  constructor(@Inject(MediasService) private readonly service: MediasService) {}

  @Query(() => MediaModel, { name: 'media' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<MediaModel> {
    return await this.service.get(id)
  }

  @Query(() => [MediaModel], { name: 'media' })
  async list(): Promise<MediaModel[]> {
    return await this.service.list()
  }

  @Mutation(() => MediaModel)
  async createMedia(@Args('input') input: MediaInput): Promise<MediaModel> {
    return await this.service.create(input)
  }

  @Mutation(() => MediaModel)
  async removeMedia(@Args('id', { type: () => Int }) id: number): Promise<MediaModel> {
    return await this.service.delete(id)
  }
}
