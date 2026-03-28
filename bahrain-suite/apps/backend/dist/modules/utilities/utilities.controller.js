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
exports.UtilitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const create_ewa_account_dto_1 = require("./dto/create-ewa-account.dto");
const create_ewa_bill_dto_1 = require("./dto/create-ewa-bill.dto");
const find_ewa_accounts_dto_1 = require("./dto/find-ewa-accounts.dto");
const find_ewa_bills_dto_1 = require("./dto/find-ewa-bills.dto");
const utilities_service_1 = require("./utilities.service");
const UTILITIES_READ_ROLES = [
    user_role_enum_1.UserRole.ADMIN,
    user_role_enum_1.UserRole.ACCOUNTANT,
    user_role_enum_1.UserRole.STAFF,
    user_role_enum_1.UserRole.HR,
    user_role_enum_1.UserRole.DEVELOPER,
];
let UtilitiesController = class UtilitiesController {
    constructor(service) {
        this.service = service;
    }
    overview(propertyId) {
        return this.service.overview(propertyId);
    }
    listEwaAccounts(query) {
        return this.service.findEwaAccounts(query);
    }
    createEwaAccount(dto) {
        return this.service.createEwaAccount(dto);
    }
    listEwaBills(query) {
        return this.service.findEwaBills(query);
    }
    createEwaBill(dto) {
        return this.service.createEwaBill(dto);
    }
};
exports.UtilitiesController = UtilitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Utilities hub summary (EWA accounts and bills counts)',
    }),
    __param(0, (0, common_1.Query)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilitiesController.prototype, "overview", null);
__decorate([
    (0, common_1.Get)('ewa/accounts'),
    (0, swagger_1.ApiOperation)({ summary: 'List EWA utility accounts by property' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ewa_accounts_dto_1.FindEwaAccountsDto]),
    __metadata("design:returntype", void 0)
], UtilitiesController.prototype, "listEwaAccounts", null);
__decorate([
    (0, common_1.Post)('ewa/accounts'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.ACCOUNTANT, user_role_enum_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Register an EWA account for a property / unit' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ewa_account_dto_1.CreateEwaAccountDto]),
    __metadata("design:returntype", void 0)
], UtilitiesController.prototype, "createEwaAccount", null);
__decorate([
    (0, common_1.Get)('ewa/bills'),
    (0, swagger_1.ApiOperation)({ summary: 'List EWA bills (with balances)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ewa_bills_dto_1.FindEwaBillsDto]),
    __metadata("design:returntype", void 0)
], UtilitiesController.prototype, "listEwaBills", null);
__decorate([
    (0, common_1.Post)('ewa/bills'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.ACCOUNTANT, user_role_enum_1.UserRole.STAFF),
    (0, swagger_1.ApiOperation)({ summary: 'Record an EWA bill / payment line' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ewa_bill_dto_1.CreateEwaBillDto]),
    __metadata("design:returntype", void 0)
], UtilitiesController.prototype, "createEwaBill", null);
exports.UtilitiesController = UtilitiesController = __decorate([
    (0, swagger_1.ApiTags)('utilities'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('utilities'),
    (0, roles_decorator_1.Roles)(...UTILITIES_READ_ROLES),
    __metadata("design:paramtypes", [utilities_service_1.UtilitiesService])
], UtilitiesController);
//# sourceMappingURL=utilities.controller.js.map