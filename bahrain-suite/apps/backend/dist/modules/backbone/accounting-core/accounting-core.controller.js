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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingCoreController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../auth/user-role.enum");
const accounting_core_service_1 = require("./accounting-core.service");
let AccountingCoreController = class AccountingCoreController {
    constructor(service) {
        this.service = service;
    }
    getStatus() {
        return this.service.getScaffoldStatus();
    }
};
exports.AccountingCoreController = AccountingCoreController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountingCoreController.prototype, "getStatus", null);
exports.AccountingCoreController = AccountingCoreController = __decorate([
    (0, common_1.Controller)('internal/scaffold/accounting'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    __metadata("design:paramtypes", [accounting_core_service_1.AccountingCoreService])
], AccountingCoreController);
//# sourceMappingURL=accounting-core.controller.js.map