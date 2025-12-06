import { CurrentUser } from '@decorators/current-user.decorator'
import { ApproveEvaluationInput } from '@evaluation-approvals/dto/approve-evaluation.input'
import { ListEvaluationApprovalsInput } from '@evaluation-approvals/dto/list-evaluation-approvals.input'
import { RejectEvaluationInput } from '@evaluation-approvals/dto/reject-evaluation.input'
import { EvaluationApprovalModel } from '@evaluation-approvals/entities/evaluation-approval.entity'
import { EvaluationApprovalsService } from '@evaluation-approvals/evaluation-approvals.service'
import { HRDepartmentGuard } from '@guards/hr-department.guard'
import { JwtAuthGuard } from '@guards/jwt.auth.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'

@Resolver(() => EvaluationApprovalModel)
export class EvaluationApprovalsResolver {
  constructor(
    @Inject(EvaluationApprovalsService) private readonly service: EvaluationApprovalsService
  ) {}

  @UseGuards(JwtAuthGuard, HRDepartmentGuard)
  @Query(() => EvaluationApprovalModel, { name: 'evaluationApproval' })
  async get(@Args('id', { type: () => Int }) id: number): Promise<EvaluationApprovalModel> {
    return await this.service.get(id)
  }

  @UseGuards(JwtAuthGuard, HRDepartmentGuard)
  @Query(() => [EvaluationApprovalModel], { name: 'evaluationApprovals' })
  async list(
    @Args('input', { nullable: true }) input?: ListEvaluationApprovalsInput
  ): Promise<EvaluationApprovalModel[]> {
    return await this.service.list(input)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [EvaluationApprovalModel], { name: 'rejectedEvaluationsForManager' })
  async getRejectedForManager(
    @CurrentUser() user: UserModel
  ): Promise<EvaluationApprovalModel[]> {
    return await this.service.getRejectedByManager(user.id)
  }

  @UseGuards(JwtAuthGuard, HRDepartmentGuard)
  @Mutation(() => EvaluationApprovalModel)
  async approveEvaluation(
    @Args('input') input: ApproveEvaluationInput,
    @CurrentUser() user: UserModel
  ): Promise<EvaluationApprovalModel> {
    return await this.service.approve(input, user)
  }

  @UseGuards(JwtAuthGuard, HRDepartmentGuard)
  @Mutation(() => EvaluationApprovalModel)
  async rejectEvaluation(
    @Args('input') input: RejectEvaluationInput,
    @CurrentUser() user: UserModel
  ): Promise<EvaluationApprovalModel> {
    return await this.service.reject(input, user)
  }
}

