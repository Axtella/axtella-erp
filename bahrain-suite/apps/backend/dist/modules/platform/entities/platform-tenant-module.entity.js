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
exports.PlatformTenantModule = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let PlatformTenantModule = class PlatformTenantModule extends base_entity_1.AppBaseEntity {
};
exports.PlatformTenantModule = PlatformTenantModule;
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_id', type: 'uuid' }),
    __metadata("design:type", String)
], PlatformTenantModule.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'module_id', type: 'uuid' }),
    __metadata("design:type", String)
], PlatformTenantModule.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PlatformTenantModule.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'manual' }),
    __metadata("design:type", String)
], PlatformTenantModule.prototype, "source", void 0);
exports.PlatformTenantModule = PlatformTenantModule = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_tenant_modules' })
], PlatformTenantModule);
//# sourceMappingURL=platform-tenant-module.entity.js.map