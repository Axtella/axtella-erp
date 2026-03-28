"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const common_1 = require("@nestjs/common");
exports.Tenant = (0, common_1.createParamDecorator)((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers['x-tenant-id'];
    if (Array.isArray(header))
        return header[0];
    return typeof header === 'string' ? header : undefined;
});
//# sourceMappingURL=tenant.decorator.js.map