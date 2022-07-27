import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { FORCE_AUTH } from '../../shared/Util';
import { IS_PUBLIC_KEY } from '../../shared/Util/decorators/public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const forceAuth = this.reflector.getAllAndOverride<boolean>(FORCE_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (forceAuth) {
      return super.canActivate(context);
    }

    if (forceAuth) {
      return super.canActivate(context);
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (
      context.switchToHttp().getRequest<Request>().method.toUpperCase() ===
        'GET' ||
      isPublic
    ) {
      return true;
    }
    return super.canActivate(context);
  }
}
