import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthUser } from '../types/jwt-payload.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { parseUserRole, roleHasAccess, type UserRole } from '../user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser | undefined;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }
    const role = parseUserRole(user.role);
    if (!roleHasAccess(role, required)) {
      throw new ForbiddenException('Insufficient permissions for this action');
    }
    return true;
  }
}
