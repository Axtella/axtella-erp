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
exports.Tenant = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let Tenant = class Tenant extends base_entity_1.AppBaseEntity {
};
exports.Tenant = Tenant;
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_code', unique: true, length: 50 }),
    __metadata("design:type", String)
], Tenant.prototype, "tenantCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_name', length: 200 }),
    __metadata("design:type", String)
], Tenant.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name', length: 200 }),
    __metadata("design:type", String)
], Tenant.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', length: 10 }),
    __metadata("design:type", String)
], Tenant.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', length: 10, default: 'BHD' }),
    __metadata("design:type", String)
], Tenant.prototype, "currencyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timezone', length: 100 }),
    __metadata("design:type", String)
], Tenant.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', length: 30, default: 'active' }),
    __metadata("design:type", String)
], Tenant.prototype, "status", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)({ name: 'tenants' })
], Tenant);
//# sourceMappingURL=tenant.entity.js.map