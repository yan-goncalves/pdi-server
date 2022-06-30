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
    ratingUser,
    ratingManager,
    ...input
  }: CreatePerformedSkillInput): Promise<PerformedSkillModel> {
    try {
      const typeofUser = typeof ratingUser === 'number'
      const ratingUserFound = !typeofUser ? null : await this.ratingsService.get(ratingUser)

      const typeofManager = typeof ratingManager === 'number'
      const ratingManagerFound = !typeofManager
        ? null
        : await this.ratingsService.get(ratingManager)

      const performed = await this.performedService.get(idPerformed)
      const skill = await this.skillsService.get(idSkill)

      return await this.repo.save(
        this.repo.create({
          performed,
          skill,
          ratingUser: ratingUserFound,
          ratingManager: ratingManagerFound,
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

  private isValidRating(rating?: number): boolean {
    return typeof rating === 'number'
  }

  async update(
    id: number,
    { ratingUser, ratingManager, ...input }: UpdatePerformedSkillInput
  ): Promise<PerformedSkillModel> {
    try {
      const performedSkill = await this.get(id)
      this.repo.merge(performedSkill, { ...input })
      await this.repo.save(performedSkill)

      if (this.isValidRating(ratingUser)) {
        const ratingUserFound = ratingUser >= 0 ? await this.ratingsService.get(ratingUser) : null

        await this.repo.update(
          { id: performedSkill.id },
          {
            ...input,
            ratingUser: ratingUserFound
          }
        )
      }

      if (this.isValidRating(ratingManager)) {
        const ratingManagerFound =
          ratingManager >= 0 ? await this.ratingsService.get(ratingManager) : null

        await this.repo.update(
          { id: performedSkill.id },
          {
            ...input,
            ratingManager: ratingManagerFound
          }
        )
      }

      return await this.repo.findOneBy({ id: performedSkill.id })
    } catch (error) {
      throw new error()
    }
  }
}
