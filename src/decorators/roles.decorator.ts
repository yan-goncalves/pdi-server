import { ROLES } from '@constants/roles'
import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: ROLES[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles)
