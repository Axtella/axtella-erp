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
exports.PlatformTenant = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let PlatformTenant = class PlatformTenant extends base_entity_1.AppBaseEntity {
};
exports.PlatformTenant = PlatformTenant;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 80 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_name', length: 220 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', length: 220 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', length: 40 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', length: 10 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "currencyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_language', length: 20, default: 'en' }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "defaultLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_code', length: 80, default: 'starter' }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "planCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'draft' }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_pack_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "countryPackId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compliance_pack_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "compliancePackId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_template_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "roleTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], PlatformTenant.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PlatformTenant.prototype, "updatedBy", void 0);
exports.PlatformTenant = PlatformTenant = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_tenants' })
], PlatformTenant);
//# sourceMappingURL=platform-tenant.entity.js.map