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
exports.FeatureFlagsController = void 0;
const common_1 = require("@nestjs/common");
const tenant_decorator_1 = require("../../common/decorators/tenant.decorator");
const tenant_guard_1 = require("../../common/guards/tenant.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const create_feature_flag_dto_1 = require("./dto/create-feature-flag.dto");
const find_feature_flags_dto_1 = require("./dto/find-feature-flags.dto");
const update_feature_flag_dto_1 = require("./dto/update-feature-flag.dto");
const feature_flags_service_1 = require("./feature-flags.service");
let FeatureFlagsController = class FeatureFlagsController {
    constructor(service) {
        this.service = service;
    }
    create(dto, tenantId) {
        return this.service.create(dto, tenantId);
    }
    findAll(query, tenantId) {
        return this.service.findAll(query, tenantId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
};
exports.FeatureFlagsController = FeatureFlagsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feature_flag_dto_1.CreateFeatureFlagDto, String]),
    __metadata("design:returntype", void 0)
], FeatureFlagsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_feature_flags_dto_1.FindFeatureFlagsDto, String]),
    __metadata("design:returntype", void 0)
], FeatureFlagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeatureFlagsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_feature_flag_dto_1.UpdateFeatureFlagDto]),
    __metadata("design:returntype", void 0)
], FeatureFlagsController.prototype, "update", null);
exports.FeatureFlagsController = FeatureFlagsController = __decorate([
    (0, common_1.Controller)('feature-flags'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    (0, common_1.UseGuards)(tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [feature_flags_service_1.FeatureFlagsService])
], FeatureFlagsController);
//# sourceMappingURL=feature-flags.controller.js.map