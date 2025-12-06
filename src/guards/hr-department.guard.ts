import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

// Possible HR department keys
const HR_DEPARTMENT_KEYS = ['rh', 'recursos_humanos', 'human_resources']

@Injectable()
export class HRDepartmentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user

    if (!user || !user.department) {
      return false
    }

    const departmentKey = user.department.key?.toLowerCase()
    return HR_DEPARTMENT_KEYS.includes(departmentKey)
  }
}

