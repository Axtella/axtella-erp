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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const cost_center_entity_1 = require("../../cost-centers/entities/cost-center.entity");
const property_entity_1 = require("../../properties/entities/property.entity");
const tenant_entity_1 = require("../../tenants/entities/tenant.entity");
const unit_entity_1 = require("../../units/entities/unit.entity");
let Booking = class Booking extends base_entity_1.AppBaseEntity {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], Booking.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], Booking.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_center_id', type: 'uuid' }),
    __metadata("design:type", String)
], Booking.prototype, "costCenterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cost_center_entity_1.CostCenter),
    (0, typeorm_1.JoinColumn)({ name: 'cost_center_id' }),
    __metadata("design:type", cost_center_entity_1.CostCenter)
], Booking.prototype, "costCenter", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_id', type: 'uuid' }),
    __metadata("design:type", String)
], Booking.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], Booking.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_id', type: 'uuid' }),
    __metadata("design:type", String)
], Booking.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Booking.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_type', length: 30 }),
    __metadata("design:type", String)
], Booking.prototype, "bookingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_source', length: 100, nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "bookingSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_in_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Booking.prototype, "checkInDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_out_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "checkOutDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_start_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "contractStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_end_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "contractEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'reserved' }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate_daily', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "rateDaily", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate_monthly', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "rateMonthly", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deposit_amount', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "depositAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount_amount', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "notes", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)({ name: 'bookings' })
], Booking);
//# sourceMappingURL=booking.entity.js.map