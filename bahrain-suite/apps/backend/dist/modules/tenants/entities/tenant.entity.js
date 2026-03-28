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
    (0, typeorm_1.Column)({ name: 'tenant_type', length: 30 }),
    __metadata("design:type", String)
], Tenant.prototype, "tenantType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 200 }),
    __metadata("design:type", String)
], Tenant.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpr_no', length: 100, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "cprNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'passport_no', length: 100, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "passportNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_expiry_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "idExpiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "emergencyContactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "notes", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)({ name: 'tenants' })
], Tenant);
//# sourceMappingURL=tenant.entity.js.map