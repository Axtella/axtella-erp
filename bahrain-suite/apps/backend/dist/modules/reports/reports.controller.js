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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const find_trial_balance_dto_1 = require("../accounting/dto/find-trial-balance.dto");
const reports_service_1 = require("./reports.service");
const READ = [
    user_role_enum_1.UserRole.ADMIN,
    user_role_enum_1.UserRole.ACCOUNTANT,
    user_role_enum_1.UserRole.HR,
    user_role_enum_1.UserRole.DEVELOPER,
    user_role_enum_1.UserRole.STAFF,
];
let ReportsController = class ReportsController {
    constructor(service) {
        this.service = service;
    }
    async portfolioExcel() {
        const buf = await this.service.buildPortfolioRegisterXlsx();
        return new common_1.StreamableFile(buf, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            disposition: 'attachment; filename="axtella-portfolio-register.xlsx"',
        });
    }
    async portfolioPdf() {
        const buf = await this.service.buildPortfolioRegisterPdf();
        return new common_1.StreamableFile(buf, {
            type: 'application/pdf',
            disposition: 'attachment; filename="axtella-portfolio-register.pdf"',
        });
    }
    async trialBalancePdf(q) {
        const buf = await this.service.buildTrialBalancePdf(q.from, q.to, q.propertyId);
        const name = `trial-balance-${q.from}_to_${q.to}.pdf`;
        return new common_1.StreamableFile(buf, {
            type: 'application/pdf',
            disposition: `attachment; filename="${name}"`,
        });
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('portfolio/excel'),
    (0, swagger_1.ApiOperation)({ summary: 'Portfolio register — Excel template export' }),
    (0, swagger_1.ApiProduces)('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "portfolioExcel", null);
__decorate([
    (0, common_1.Get)('portfolio/pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Portfolio register — PDF report' }),
    (0, swagger_1.ApiProduces)('application/pdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "portfolioPdf", null);
__decorate([
    (0, common_1.Get)('trial-balance/pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Trial balance — PDF (same basis as accounting TB)' }),
    (0, swagger_1.ApiProduces)('application/pdf'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_trial_balance_dto_1.FindTrialBalanceDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "trialBalancePdf", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('reports'),
    (0, roles_decorator_1.Roles)(...READ),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map