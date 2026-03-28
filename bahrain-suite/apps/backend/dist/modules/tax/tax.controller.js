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
exports.TaxController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const bahrain_vat_1 = require("./bahrain-vat");
const ALL = [
    user_role_enum_1.UserRole.ADMIN,
    user_role_enum_1.UserRole.ACCOUNTANT,
    user_role_enum_1.UserRole.HR,
    user_role_enum_1.UserRole.DEVELOPER,
    user_role_enum_1.UserRole.STAFF,
];
let TaxController = class TaxController {
    fromNet(amount) {
        const n = Number(amount);
        if (amount === undefined || Number.isNaN(n)) {
            throw new common_1.BadRequestException('Query "amount" must be a number (net / tax-exclusive)');
        }
        return { jurisdiction: 'BH', ...(0, bahrain_vat_1.vatFromNet)(n) };
    }
    fromGross(amount) {
        const n = Number(amount);
        if (amount === undefined || Number.isNaN(n)) {
            throw new common_1.BadRequestException('Query "amount" must be a number (gross / tax-inclusive)');
        }
        return { jurisdiction: 'BH', ...(0, bahrain_vat_1.vatFromGross)(n) };
    }
};
exports.TaxController = TaxController;
__decorate([
    (0, common_1.Get)('bahrain-vat/from-net'),
    (0, swagger_1.ApiOperation)({ summary: 'Bahrain 10% VAT from net (exclusive) amount' }),
    __param(0, (0, common_1.Query)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxController.prototype, "fromNet", null);
__decorate([
    (0, common_1.Get)('bahrain-vat/from-gross'),
    (0, swagger_1.ApiOperation)({ summary: 'Bahrain 10% VAT split from gross (inclusive) amount' }),
    __param(0, (0, common_1.Query)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxController.prototype, "fromGross", null);
exports.TaxController = TaxController = __decorate([
    (0, swagger_1.ApiTags)('tax'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('tax'),
    (0, roles_decorator_1.Roles)(...ALL)
], TaxController);
//# sourceMappingURL=tax.controller.js.map