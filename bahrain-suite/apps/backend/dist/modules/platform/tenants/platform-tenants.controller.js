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
exports.PlatformTenantsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../auth/user-role.enum");
const platform_tenants_service_1 = require("./platform-tenants.service");
const create_platform_tenant_dto_1 = require("./dto/create-platform-tenant.dto");
const set_platform_tenant_modules_dto_1 = require("./dto/set-platform-tenant-modules.dto");
const assign_country_pack_dto_1 = require("../packs/dto/assign-country-pack.dto");
const assign_compliance_pack_dto_1 = require("../packs/dto/assign-compliance-pack.dto");
const update_platform_tenant_branding_dto_1 = require("./dto/update-platform-tenant-branding.dto");
const provision_platform_tenant_dto_1 = require("../provisioning/dto/provision-platform-tenant.dto");
let PlatformTenantsController = class PlatformTenantsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.createTenant(dto);
    }
    findOne(id) {
        return this.service.findTenant(id);
    }
    setModules(id, dto) {
        return this.service.setTenantModules(id, dto);
    }
    setCountryPack(id, dto) {
        return this.service.assignCountryPack(id, dto);
    }
    setCompliancePack(id, dto) {
        return this.service.assignCompliancePack(id, dto);
    }
    updateBranding(id, dto) {
        return this.service.updateBranding(id, dto);
    }
    provision(id, dto) {
        return this.service.provisionTenant(id, dto);
    }
    findProvisionRuns(id) {
        return this.service.findProvisionRuns(id);
    }
};
exports.PlatformTenantsController = PlatformTenantsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_platform_tenant_dto_1.CreatePlatformTenantDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/modules'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, set_platform_tenant_modules_dto_1.SetPlatformTenantModulesDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "setModules", null);
__decorate([
    (0, common_1.Patch)(':id/country-pack'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_country_pack_dto_1.AssignCountryPackDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "setCountryPack", null);
__decorate([
    (0, common_1.Patch)(':id/compliance-pack'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_compliance_pack_dto_1.AssignCompliancePackDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "setCompliancePack", null);
__decorate([
    (0, common_1.Patch)(':id/branding'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_platform_tenant_branding_dto_1.UpdatePlatformTenantBrandingDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "updateBranding", null);
__decorate([
    (0, common_1.Post)(':id/provision'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, provision_platform_tenant_dto_1.ProvisionPlatformTenantDto]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "provision", null);
__decorate([
    (0, common_1.Get)(':id/provision-runs'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlatformTenantsController.prototype, "findProvisionRuns", null);
exports.PlatformTenantsController = PlatformTenantsController = __decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    (0, common_1.Controller)('platform/tenants'),
    __metadata("design:paramtypes", [platform_tenants_service_1.PlatformTenantsService])
], PlatformTenantsController);
//# sourceMappingURL=platform-tenants.controller.js.map