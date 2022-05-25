import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { CreatePerformedSkillInput } from '@performed-skills/dto/create-performed-skill.input'
import { UpdatePerformedSkillInput } from '@performed-skills/dto/update-performed-skill.input'
import { PerformedSkillModel } from '@performed-skills/entities/performed-skill.entity'
import { RatingsService } from '@ratings/ratings.service'
import { SkillsService } from '@skills/skills.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class PerformedSkillsService {
  constructor(
    @InjectRepository(PerformedSkillModel) private readonly repo: Repository<PerformedSkillModel>,
    @Inject(PerformedEvaluationsService)
    private readonly performedService: PerformedEvaluationsService,
    @Inject(SkillsService) private readonly skillsService: SkillsService,
    @Inject(RatingsService) private readonly ratingsService: RatingsService
  ) {}

  async get(id: number): Promise<PerformedSkillModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('PerformedSkill not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<PerformedSkillModel> | FindOptionsWhere<PerformedSkillModel>[]
  ): Promise<PerformedSkillModel> {
    try {
      return await this.repo.findOneByOrFail(options)
    } catch {
      throw new NotFoundException('PerformedSkill not found')
    }
  }

  async list(): Promise<PerformedSkillModel[]> {
    return await this.repo.find()
  }

  async create({
    idPerformed,
    idSkill,
    idRatingUser,
    idRatingManager,
    ...input
  }: CreatePerformedSkillInput): Promise<PerformedSkillModel> {
    try {
      const typeofUser = typeof idRatingUser === 'number'
      const ratingUser = !typeofUser ? null : await this.ratingsService.get(idRatingUser)

      const typeofManager = typeof idRatingManager === 'number'
      const ratingManager = !typeofManager ? null : await this.ratingsService.get(idRatingManager)

      const performed = await this.performedService.get(idPerformed)
      const skill = await this.skillsService.get(idSkill)

      return await this.repo.save(
        this.repo.create({
          performed,
          skill,
          ratingUser,
          ratingManager,
          ...input
        })
      )
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new ConflictException('PerformedSkill already exists')
    }
  }

  async update(
    id: number,
    { idRatingUser, idRatingManager, ...input }: UpdatePerformedSkillInput
  ): Promise<PerformedSkillModel> {
    try {
      const performedSkill = await this.get(id)
      const ratingUser = await this.ratingsService.get(idRatingUser)
      const ratingManager = await this.ratingsService.get(idRatingManager)
      this.repo.merge(performedSkill, { ratingUser, ratingManager, ...input })
      return await this.repo.save(performedSkill)
    } catch (error) {
      throw error
    }
  }
}
