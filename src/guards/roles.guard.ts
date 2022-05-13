import { ROLES } from '@constants/roles'
import { ROLES_KEY } from '@decorators/roles.decorator'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserModel } from '@users/entities/user.entity'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) {
      return true
    }
    const { user }: { user: UserModel } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.role?.includes(role))
  }
}
