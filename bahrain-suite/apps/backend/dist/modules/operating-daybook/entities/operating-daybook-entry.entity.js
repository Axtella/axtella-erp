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
exports.OperatingDaybookEntry = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const property_entity_1 = require("../../properties/entities/property.entity");
const unit_entity_1 = require("../../units/entities/unit.entity");
let OperatingDaybookEntry = class OperatingDaybookEntry extends base_entity_1.AppBaseEntity {
};
exports.OperatingDaybookEntry = OperatingDaybookEntry;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], OperatingDaybookEntry.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], OperatingDaybookEntry.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entry_date', type: 'date' }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "entryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'voucher_no', length: 100, nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "voucherNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_category', length: 50 }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "accountCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_channel', length: 50, nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "paymentChannel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_hint', length: 200, nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "bankAccountHint", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 16, scale: 3, default: 0 }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "debit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 16, scale: 3, default: 0 }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OperatingDaybookEntry.prototype, "approved", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', length: 200, nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approval_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OperatingDaybookEntry.prototype, "remarks", void 0);
exports.OperatingDaybookEntry = OperatingDaybookEntry = __decorate([
    (0, typeorm_1.Entity)({ name: 'operating_daybook_entries' })
], OperatingDaybookEntry);
//# sourceMappingURL=operating-daybook-entry.entity.js.map