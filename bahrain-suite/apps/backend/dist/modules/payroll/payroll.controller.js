"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const payroll_service_1 = require("./payroll.service");
const create_payroll_run_dto_1 = require("./dto/create-payroll-run.dto");
let PayrollController = class PayrollController {
    constructor(service) {
        this.service = service;
    }
    generate(dto) {
        return this.service.generateRun(dto);
    }
    preview(month, year) {
        return this.service.previewSharedAllocation(Number(month), Number(year));
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Post)('runs/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_run_dto_1.CreatePayrollRunDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('shared-allocation/preview'),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "preview", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.HR, user_role_enum_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map