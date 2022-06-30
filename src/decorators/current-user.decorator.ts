import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export enum CurrentUserType {
  GRAPHQL = 'GRAPHQL',
  REST = 'REST'
}

export const CurrentUser = createParamDecorator(
  (currentUserType: CurrentUserType = CurrentUserType.GRAPHQL, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)

    return currentUserType === CurrentUserType.REST
      ? context.switchToHttp().getRequest().user
      : ctx.getContext().req.user
  }
)
