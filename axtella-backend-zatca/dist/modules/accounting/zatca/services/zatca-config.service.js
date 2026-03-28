"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZatcaConfigService = void 0;
const common_1 = require("@nestjs/common");
let ZatcaConfigService = class ZatcaConfigService {
    getConfig() {
        return {
            enabled: process.env.SAUDI_ZATCA_ENABLED === 'true',
            environment: process.env.ZATCA_ENVIRONMENT || 'sandbox',
            baseUrl: process.env.ZATCA_BASE_URL || '',
            portalUrl: process.env.ZATCA_PORTAL_URL || '',
            timeoutMs: Number(process.env.ZATCA_TIMEOUT_MS || 20000),
        };
    }
};
exports.ZatcaConfigService = ZatcaConfigService;
exports.ZatcaConfigService = ZatcaConfigService = __decorate([
    (0, common_1.Injectable)()
], ZatcaConfigService);
//# sourceMappingURL=zatca-config.service.js.map