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
exports.UtilityBill = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let UtilityBill = class UtilityBill extends base_entity_1.AppBaseEntity {
};
exports.UtilityBill = UtilityBill;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], UtilityBill.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utility_type', length: 30 }),
    __metadata("design:type", String)
], UtilityBill.prototype, "utilityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'billing_period_start', type: 'date' }),
    __metadata("design:type", String)
], UtilityBill.prototype, "billingPeriodStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'billing_period_end', type: 'date' }),
    __metadata("design:type", String)
], UtilityBill.prototype, "billingPeriodEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], UtilityBill.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'unpaid' }),
    __metadata("design:type", String)
], UtilityBill.prototype, "status", void 0);
exports.UtilityBill = UtilityBill = __decorate([
    (0, typeorm_1.Entity)({ name: 'utility_bills' })
], UtilityBill);
//# sourceMappingURL=utility-bill.entity.js.map