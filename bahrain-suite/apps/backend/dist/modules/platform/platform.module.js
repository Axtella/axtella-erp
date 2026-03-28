"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_module_catalog_entity_1 = require("./entities/platform-module-catalog.entity");
const platform_country_pack_entity_1 = require("./entities/platform-country-pack.entity");
const platform_compliance_pack_entity_1 = require("./entities/platform-compliance-pack.entity");
const platform_role_template_entity_1 = require("./entities/platform-role-template.entity");
const platform_tenant_entity_1 = require("./entities/platform-tenant.entity");
const platform_tenant_module_entity_1 = require("./entities/platform-tenant-module.entity");
const platform_tenant_branding_entity_1 = require("./entities/platform-tenant-branding.entity");
const platform_tenant_provision_run_entity_1 = require("./entities/platform-tenant-provision-run.entity");
const platform_tenants_controller_1 = require("./tenants/platform-tenants.controller");
const platform_tenants_service_1 = require("./tenants/platform-tenants.service");
let PlatformModule = class PlatformModule {
};
exports.PlatformModule = PlatformModule;
exports.PlatformModule = PlatformModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                platform_module_catalog_entity_1.PlatformModuleCatalog,
                platform_country_pack_entity_1.PlatformCountryPack,
                platform_compliance_pack_entity_1.PlatformCompliancePack,
                platform_role_template_entity_1.PlatformRoleTemplate,
                platform_tenant_entity_1.PlatformTenant,
                platform_tenant_module_entity_1.PlatformTenantModule,
                platform_tenant_branding_entity_1.PlatformTenantBranding,
                platform_tenant_provision_run_entity_1.PlatformTenantProvisionRun,
            ]),
        ],
        controllers: [platform_tenants_controller_1.PlatformTenantsController],
        providers: [platform_tenants_service_1.PlatformTenantsService],
        exports: [platform_tenants_service_1.PlatformTenantsService, typeorm_1.TypeOrmModule],
    })
], PlatformModule);
//# sourceMappingURL=platform.module.js.map