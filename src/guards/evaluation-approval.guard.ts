import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

// Possible HR department keys
const APPROVAL_EVALUATION_USERS = ['marcomarelli', 'sabrinavelasques']

@Injectable()
export class EvaluationApprovalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user

    if (!user || !user.department) {
      return false
    }

    const username = user.username?.toLowerCase()
    return APPROVAL_EVALUATION_USERS.includes(username)
  }
}
