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
exports.PlatformTenantBranding = void 0;
const typeorm_1 = require("typeorm");
let PlatformTenantBranding = class PlatformTenantBranding {
};
exports.PlatformTenantBranding = PlatformTenantBranding;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'tenant_id', type: 'uuid' }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_name', length: 220, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_light_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "logoLightUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_dark_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "logoDarkUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_color', length: 20, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'secondary_color', length: 20, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accent_color', length: 20, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "accentColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_from_name', length: 220, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "emailFromName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'support_email', length: 220, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "supportEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'support_phone', length: 60, nullable: true }),
    __metadata("design:type", String)
], PlatformTenantBranding.prototype, "supportPhone", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PlatformTenantBranding.prototype, "updatedAt", void 0);
exports.PlatformTenantBranding = PlatformTenantBranding = __decorate([
    (0, typeorm_1.Entity)({ name: 'platform_tenant_branding' })
], PlatformTenantBranding);
//# sourceMappingURL=platform-tenant-branding.entity.js.map