import { MediaInput } from '@medias/dto/media.input'
import { MediaModel } from '@medias/entities/media.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class MediasService {
  constructor(@InjectRepository(MediaModel) private readonly repo: Repository<MediaModel>) {}

  async get(id: number): Promise<MediaModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Media not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<MediaModel> | FindOptionsWhere<MediaModel>[]
  ): Promise<MediaModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('Media not found')
    }
  }

  async list(): Promise<MediaModel[]> {
    return await this.repo.find()
  }

  async create(input: MediaInput): Promise<MediaModel> {
    return await this.repo.save(this.repo.create({ ...input }))
  }

  async update(id: number, input: MediaInput): Promise<MediaModel> {
    try {
      const mediaFound = await this.get(id)
      this.repo.merge(mediaFound, { ...input })
      return await this.repo.save(this.repo.create({ ...input }))
    } catch {
      throw new NotFoundException('Media not found')
    }
  }

  async delete(id: number): Promise<MediaModel> {
    try {
      const mediaFound = await this.repo.findOne({ where: { id }, withDeleted: true })
      await this.repo.delete({ id: mediaFound.id })
      return mediaFound
    } catch {
      throw new NotFoundException('Media not found')
    }
  }
}
