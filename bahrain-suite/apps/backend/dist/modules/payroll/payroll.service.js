"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
let PayrollService = class PayrollService {
    generateRun(dto) {
        return {
            message: 'Payroll run generated',
            ...dto,
            allocations: [
                { employee: 'Operations Manager', abbas: 40, diamond: 35, mirage: 25 },
                { employee: 'Accountant', abbas: 34, diamond: 33, mirage: 33 },
            ],
        };
    }
    previewSharedAllocation(month, year) {
        return {
            month,
            year,
            basis: 'fixed_percentage',
            items: [],
        };
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)()
], PayrollService);
//# sourceMappingURL=payroll.service.js.map