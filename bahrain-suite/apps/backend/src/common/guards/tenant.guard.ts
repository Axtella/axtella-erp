import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const tenantHeader = req.headers['x-tenant-id'];
    const tenantId = Array.isArray(tenantHeader) ? tenantHeader[0] : tenantHeader;
    if (!tenantId || typeof tenantId !== 'string') {
      return true;
    }

    const paramTenant = req.params?.customerId ?? req.params?.tenantId;
    const bodyTenant = req.body?.customerId ?? req.body?.tenantId;
    if (paramTenant && paramTenant !== tenantId) {
      throw new ForbiddenException('Tenant scope mismatch with route parameter');
    }
    if (bodyTenant && bodyTenant !== tenantId) {
      throw new ForbiddenException('Tenant scope mismatch with request body');
    }
    return true;
  }
}
