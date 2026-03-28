"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrCoreService = void 0;
const common_1 = require("@nestjs/common");
let HrCoreService = class HrCoreService {
    getScaffoldStatus() {
        return {
            domain: 'hr-core',
            phase: 4,
            ready: true,
            modules: [
                'employees',
                'org-structure',
                'attendance',
                'leave',
                'payroll',
                'shifts',
                'employee-documents',
                'compliance-tracking',
            ],
            notes: 'HR scaffold is ready. Implement payroll calendar rules and country payroll compliance adapters next.',
        };
    }
};
exports.HrCoreService = HrCoreService;
exports.HrCoreService = HrCoreService = __decorate([
    (0, common_1.Injectable)()
], HrCoreService);
//# sourceMappingURL=hr-core.service.js.map