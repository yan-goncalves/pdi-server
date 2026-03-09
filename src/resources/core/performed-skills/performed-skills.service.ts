import { EVALUATION_APPROVAL_PERIOD } from '@constants/evaluation-approval'
import { CalibrationsService } from '@core/calibrations/calibrations.service'
import { EvaluationApprovalsService } from '@core/evaluation-approvals/evaluation-approvals.service'
import { UserModel } from '@core/users/entities/user.entity'
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
    @Inject(RatingsService) private readonly ratingsService: RatingsService,
    @Inject(EvaluationApprovalsService)
    private readonly evaluationApprovalsService: EvaluationApprovalsService
  ) {}

  async get(id: number, relations?: string[]): Promise<PerformedSkillModel> {
    try {
      return await this.repo.findOneOrFail({ where: { id }, relations })
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

      const created = await this.repo.save(
        this.repo.create({
          performed,
          skill,
          ratingUser: ratingUserFound,
          ratingManager: ratingManagerFound,
          ...input
        })
      )

      const evaluationApproval =
        await this.evaluationApprovalsService.getByPerformedEvaluationAndPeriod(
          performed.id,
          EVALUATION_APPROVAL_PERIOD.END
        )
      if (evaluationApproval?.id) {
        await this.evaluationApprovalsService.resetToPending(evaluationApproval.id)
      }

      return created
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('PerformedSkill already exists')
      }
      throw error
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
      const performedSkill = await this.get(id, ['performed'])
      this.repo.merge(performedSkill, { ...input })
      await this.repo.save(performedSkill)

      if (this.isValidRating(ratingUser)) {
        const ratingUserFound = await this.ratingsService.get(ratingUser)

        await this.repo.update(
          { id: performedSkill.id },
          {
            ...input,
            ratingUser: ratingUserFound
          }
        )
      }

      if (this.isValidRating(ratingManager)) {
        const ratingManagerFound = await this.ratingsService.get(ratingManager)

        await this.repo.update(
          { id: performedSkill.id },
          {
            ...input,
            ratingManager: ratingManagerFound
          }
        )

        const evaluationApproval =
          await this.evaluationApprovalsService.getByPerformedEvaluationAndPeriod(
            performedSkill.performed.id,
            EVALUATION_APPROVAL_PERIOD.END
          )
        if (evaluationApproval?.id) {
          await this.evaluationApprovalsService.resetToPending(evaluationApproval.id)
        }
      }

      this.repo.query(`EXEC CalcGrade @PERFORMED = ${performedSkill.performed.id}`)

      return await this.repo.findOneBy({ id: performedSkill.id })
    } catch (error) {
      throw error
    }
  }
}
