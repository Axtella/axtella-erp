"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegedPlatformService = void 0;
const common_1 = require("@nestjs/common");
let PrivilegedPlatformService = class PrivilegedPlatformService {
    getScaffoldStatus() {
        return {
            domain: 'privileged-platform',
            phase: 1,
            ready: true,
            modules: [
                'auth',
                'users',
                'roles',
                'permissions',
                'tenants',
                'environments',
                'provisioning',
                'feature-flags',
                'subscriptions',
                'branding',
                'compliance',
                'notifications',
                'approvals',
                'audit',
            ],
            notes: 'Backbone scaffold is in place. Hook each module to entities, DTOs, and workflows incrementally.',
        };
    }
};
exports.PrivilegedPlatformService = PrivilegedPlatformService;
exports.PrivilegedPlatformService = PrivilegedPlatformService = __decorate([
    (0, common_1.Injectable)()
], PrivilegedPlatformService);
//# sourceMappingURL=privileged-platform.service.js.map