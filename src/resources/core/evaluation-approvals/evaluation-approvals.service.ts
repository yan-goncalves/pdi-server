import {
  EVALUATION_APPROVAL_PERIOD,
  EVALUATION_APPROVAL_STATUS
} from '@constants/evaluation-approval'
import { ApproveEvaluationInput } from '@evaluation-approvals/dto/approve-evaluation.input'
import { ListEvaluationApprovalsInput } from '@evaluation-approvals/dto/list-evaluation-approvals.input'
import { RejectEvaluationInput } from '@evaluation-approvals/dto/reject-evaluation.input'
import { EvaluationApprovalModel } from '@evaluation-approvals/entities/evaluation-approval.entity'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { UserModel } from '@users/entities/user.entity'
import { UsersService } from '@users/users.service'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class EvaluationApprovalsService {
  constructor(
    @InjectRepository(EvaluationApprovalModel)
    private readonly repo: Repository<EvaluationApprovalModel>,
    @Inject(forwardRef(() => PerformedEvaluationsService))
    private readonly performedEvaluationsService: PerformedEvaluationsService,
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  async get(id: number): Promise<EvaluationApprovalModel> {
    try {
      return await this.repo.findOneOrFail({
        where: { id },
        relations: {
          performedEvaluation: {
            user: {
              info: true
            },
            evaluation: true,
            questions: {
              question: true
            },
            skills: {
              skill: true
            },
            goals: {
              goal: {
                kpis: true
              }
            },
            feedbacks: {
              feedback: true
            },
            pdiCoaching: true,
            pdiCompetence: true,
            pdiQuality: true
          },
          hrUser: {
            info: true
          }
        }
      })
    } catch (error) {
      throw new NotFoundException('EvaluationApproval not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<EvaluationApprovalModel>
  ): Promise<EvaluationApprovalModel | null> {
    return await this.repo.findOne({
      where: options,
      relations: {
        performedEvaluation: true,
        hrUser: {
          info: true
        }
      }
    })
  }

  async list(input?: ListEvaluationApprovalsInput): Promise<EvaluationApprovalModel[]> {
    // Para a listagem, carregamos apenas os dados essenciais
    // Os dados completos serão carregados apenas quando necessário (método get)
    // Usando QueryBuilder para garantir que apenas avaliações com usuários válidos sejam retornadas
    const queryBuilder = this.repo
      .createQueryBuilder('approval')
      .leftJoinAndSelect('approval.performedEvaluation', 'performed')
      .innerJoinAndSelect('performed.user', 'user')
      .leftJoinAndSelect('user.info', 'userInfo')
      .leftJoinAndSelect('user.manager', 'manager')
      .leftJoinAndSelect('manager.info', 'managerInfo')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('performed.evaluation', 'evaluation')
      .leftJoinAndSelect('approval.hrUser', 'hrUser')
      .leftJoinAndSelect('hrUser.info', 'hrUserInfo')
      .leftJoinAndSelect('hrUser.department', 'hrUserDepartment')
      .where('user.id IS NOT NULL')
      .andWhere('user.deletedAt IS NULL')

    if (input?.status) {
      queryBuilder.andWhere('approval.status = :status', { status: input.status })
    }

    if (input?.period) {
      queryBuilder.andWhere('approval.period = :period', { period: input.period })
    }

    return await queryBuilder.orderBy('approval.createdAt', 'DESC').getMany()
  }

  async getRejectedByManager(idManager: number): Promise<EvaluationApprovalModel[]> {
    const manager = await this.usersService.get({ id: idManager })
    const team = await this.usersService.team(manager.id)
    const teamIds = team.map((user) => user.id)

    // Para notificações, carregamos apenas dados essenciais
    // Usando innerJoin para garantir que apenas avaliações com usuários válidos sejam retornadas
    const rejectedApprovals = await this.repo
      .createQueryBuilder('approval')
      .leftJoinAndSelect('approval.performedEvaluation', 'performed')
      .innerJoinAndSelect('performed.user', 'user')
      .leftJoinAndSelect('user.info', 'userInfo')
      .leftJoinAndSelect('performed.evaluation', 'evaluation')
      .leftJoinAndSelect('approval.hrUser', 'hrUser')
      .leftJoinAndSelect('hrUser.info', 'hrUserInfo')
      .where('approval.status = :status', { status: EVALUATION_APPROVAL_STATUS.REJECTED })
      .andWhere('user.id IN (:...teamIds)', { teamIds })
      .andWhere('user.deletedAt IS NULL')
      .orderBy('approval.createdAt', 'DESC')
      .getMany()

    return rejectedApprovals
  }

  async create(
    idPerformedEvaluation: number,
    period: EVALUATION_APPROVAL_PERIOD
  ): Promise<EvaluationApprovalModel> {
    try {
      const performedEvaluation = await this.performedEvaluationsService.get(
        idPerformedEvaluation
      )

      // Check if approval already exists for this period
      const existingApproval = await this.getBy({
        performedEvaluation: { id: performedEvaluation.id },
        period
      })

      if (existingApproval) {
        throw new ConflictException('Approval already exists for this period')
      }

      return await this.repo.save(
        this.repo.create({
          performedEvaluation,
          period,
          status: EVALUATION_APPROVAL_STATUS.PENDING
        })
      )
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      throw new ConflictException('Could not create approval')
    }
  }

  async approve(input: ApproveEvaluationInput, hrUser: UserModel): Promise<EvaluationApprovalModel> {
    const performedEvaluation = await this.performedEvaluationsService.get(
      input.idPerformedEvaluation
    )

    const approval = await this.getBy({
      performedEvaluation: { id: performedEvaluation.id },
      period: input.period
    })

    if (!approval) {
      throw new NotFoundException('Approval not found for this period')
    }

    if (approval.status === EVALUATION_APPROVAL_STATUS.APPROVED) {
      throw new ConflictException('Evaluation already approved')
    }

    this.repo.merge(approval, {
      status: EVALUATION_APPROVAL_STATUS.APPROVED,
      hrUser,
      comment: input.comment
    })

    return await this.repo.save(approval)
  }

  async reject(input: RejectEvaluationInput, hrUser: UserModel): Promise<EvaluationApprovalModel> {
    const performedEvaluation = await this.performedEvaluationsService.get(
      input.idPerformedEvaluation
    )

    const approval = await this.getBy({
      performedEvaluation: { id: performedEvaluation.id },
      period: input.period
    })

    if (!approval) {
      throw new NotFoundException('Approval not found for this period')
    }

    // When rejecting, also set the finished flag back to false so manager can edit again
    if (input.period === EVALUATION_APPROVAL_PERIOD.MID) {
      await this.performedEvaluationsService.update(performedEvaluation.id, {
        midFinished: false
      })
    } else if (input.period === EVALUATION_APPROVAL_PERIOD.END) {
      await this.performedEvaluationsService.update(performedEvaluation.id, {
        endFinished: false
      })
    }

    this.repo.merge(approval, {
      status: EVALUATION_APPROVAL_STATUS.REJECTED,
      hrUser,
      comment: input.comment
    })

    return await this.repo.save(approval)
  }

  async getByPerformedEvaluationAndPeriod(
    idPerformedEvaluation: number,
    period: EVALUATION_APPROVAL_PERIOD
  ): Promise<EvaluationApprovalModel | null> {
    return await this.getBy({
      performedEvaluation: { id: idPerformedEvaluation },
      period
    })
  }

  async resetToPending(id: number): Promise<EvaluationApprovalModel> {
    const approval = await this.get(id)

    this.repo.merge(approval, {
      status: EVALUATION_APPROVAL_STATUS.PENDING,
      comment: null,
      hrUser: null
    })

    return await this.repo.save(approval)
  }
}

