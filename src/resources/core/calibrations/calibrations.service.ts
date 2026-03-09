import {
  EVALUATION_APPROVAL_PERIOD,
  EVALUATION_APPROVAL_STATUS
} from '@constants/evaluation-approval'
import { EvaluationApprovalsService } from '@evaluation-approvals/evaluation-approvals.service'
import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { UserModel } from '@users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateCalibrationInput } from './dto/create-calibration.input'
import { UpdateCalibrationInput } from './dto/update-calibration.input'
import { CalibrationModel } from './entities/calibration.entity'
import { UsersService } from '@core/users/users.service'

@Injectable()
export class CalibrationsService {
  constructor(
    @InjectRepository(CalibrationModel)
    private readonly repo: Repository<CalibrationModel>,
    @Inject(forwardRef(() => PerformedEvaluationsService))
    private readonly performedEvaluationsService: PerformedEvaluationsService,
    @Inject(forwardRef(() => EvaluationApprovalsService))
    private readonly evaluationApprovalsService: EvaluationApprovalsService,
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async get(idPerformedEvaluation: number): Promise<CalibrationModel | null> {
    return await this.repo.findOne({
      where: { performedEvaluation: { id: idPerformedEvaluation } },
      relations: {
        performedEvaluation: true,
        manager: {
          info: true
        }
      }
    })
  }

  async create(input: CreateCalibrationInput, manager: UserModel): Promise<CalibrationModel> {
    const performedEvaluation = await this.performedEvaluationsService.get(
      input.idPerformedEvaluation,
      { loadRelations: true }
    )
    const user = await this.usersService.get(
      { id: performedEvaluation.user.id },
      { loadRelations: true }
    )
    const team = await this.usersService.team(manager.id)
    const populatedTeam = await this.usersService.getMembersRecursively(user, team)

    // Verify manager is the direct manager of the user
    // OR is sabrinavelasques OR has DIRECTOR role
    const isDirectManager = populatedTeam.some((member) => member.id === user.id)
    const isSabrina = manager.username === 'sabrinavelasques'
    const isDirector = manager.role === 'DIRECTOR'

    if (!isDirectManager && !isSabrina && !isDirector) {
      throw new ForbiddenException('You are not authorized to calibrate this evaluation')
    }

    // Check if calibration already exists
    const existingCalibration = await this.get(input.idPerformedEvaluation)
    if (existingCalibration) {
      throw new ConflictException('Calibration already exists for this evaluation')
    }

    // Calculate final grade
    const originalGrade = performedEvaluation.grade || 0
    const finalGrade = Math.max(0.0, Math.min(3.0, originalGrade + input.calibrationValue))

    // Validate final grade is within bounds
    if (finalGrade < 0.0 || finalGrade > 3.0) {
      throw new ConflictException('Final grade must be between 0.0 and 3.0')
    }

    const calibration = this.repo.create({
      performedEvaluation,
      originalGrade,
      calibrationValue: input.calibrationValue,
      finalGrade,
      comment: input.comment,
      manager
    })

    const savedCalibration = await this.repo.save(calibration)

    // Update performed evaluation to mark as calibrated
    await this.performedEvaluationsService.update(input.idPerformedEvaluation, {
      isCalibrated: true
    })

    // Reset approval to PENDING when calibration is created
    await this.resetApprovalToPending(input.idPerformedEvaluation)

    return savedCalibration
  }

  async update(input: UpdateCalibrationInput, manager: UserModel): Promise<CalibrationModel> {
    const performedEvaluation = await this.performedEvaluationsService.get(
      input.idPerformedEvaluation,
      { loadRelations: true }
    )
    const user = await this.usersService.get(
      { id: performedEvaluation.user.id },
      { loadRelations: true }
    )

    // Verify manager is the direct manager of the user
    // OR is sabrinavelasques OR has DIRECTOR role
    const isDirectManager = user.manager?.id === manager.id
    const isSabrina = manager.username === 'sabrinavelasques'
    const isDirector = manager.role === 'DIRECTOR'

    if (!isDirectManager && !isSabrina && !isDirector) {
      throw new ForbiddenException('You are not authorized to calibrate this evaluation')
    }

    const calibration = await this.get(input.idPerformedEvaluation)
    if (!calibration) {
      throw new NotFoundException('Calibration not found')
    }

    // Calculate new final grade
    const originalGrade = calibration.originalGrade
    const finalGrade = Math.max(0.0, Math.min(3.0, originalGrade + input.calibrationValue))

    // Validate final grade is within bounds
    if (finalGrade < 0.0 || finalGrade > 3.0) {
      throw new ConflictException('Final grade must be between 0.0 and 3.0')
    }

    this.repo.merge(calibration, {
      calibrationValue: input.calibrationValue,
      finalGrade,
      comment: input.comment
    })

    const savedCalibration = await this.repo.save(calibration)

    // Reset approval to PENDING when calibration is edited
    await this.resetApprovalToPending(input.idPerformedEvaluation)

    return savedCalibration
  }

  private async resetApprovalToPending(idPerformedEvaluation: number): Promise<void> {
    // Check for END period approval (default for calibrations)
    const approvalEnd = await this.evaluationApprovalsService.getByPerformedEvaluationAndPeriod(
      idPerformedEvaluation,
      EVALUATION_APPROVAL_PERIOD.END
    )

    if (approvalEnd) {
      // Reset to pending if it's not already pending (handles both APPROVED and REJECTED)
      if (approvalEnd.status !== EVALUATION_APPROVAL_STATUS.PENDING) {
        await this.evaluationApprovalsService.resetToPending(approvalEnd.id)
      }
      // If approval exists and is already pending, leave it as is
      return
    }

    // Check for MID period approval as fallback
    const approvalMid = await this.evaluationApprovalsService.getByPerformedEvaluationAndPeriod(
      idPerformedEvaluation,
      EVALUATION_APPROVAL_PERIOD.MID
    )

    if (approvalMid && approvalMid.status !== EVALUATION_APPROVAL_STATUS.PENDING) {
      await this.evaluationApprovalsService.resetToPending(approvalMid.id)
    }
  }

  async delete(idPerformedEvaluation: number, manager: UserModel): Promise<boolean> {
    const calibration = await this.get(idPerformedEvaluation)
    if (!calibration) {
      throw new NotFoundException('Calibration not found')
    }

    const performedEvaluation = await this.performedEvaluationsService.get(idPerformedEvaluation, {
      loadRelations: true
    })
    const user = await this.usersService.get(
      { id: performedEvaluation.user.id },
      { loadRelations: true }
    )

    // Verify manager is the direct manager of the user
    // OR is sabrinavelasques OR has DIRECTOR role
    const isDirectManager = user.manager?.id === manager.id
    const isSabrina = manager.username === 'sabrinavelasques'
    const isDirector = manager.role === 'DIRECTOR'

    if (!isDirectManager && !isSabrina && !isDirector) {
      throw new ForbiddenException('You are not authorized to delete this calibration')
    }

    await this.repo.remove(calibration)

    // Update performed evaluation to mark as not calibrated
    await this.performedEvaluationsService.update(idPerformedEvaluation, {
      isCalibrated: false
    })

    // Reset approval to PENDING when calibration is deleted
    await this.resetApprovalToPending(idPerformedEvaluation)

    return true
  }
}
