import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Tenant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers['x-tenant-id'];
    if (Array.isArray(header)) return header[0];
    return typeof header === 'string' ? header : undefined;
  },
);
