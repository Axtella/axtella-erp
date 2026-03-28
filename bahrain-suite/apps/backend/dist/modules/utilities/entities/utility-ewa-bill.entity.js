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
exports.UtilityEwaBill = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const utility_ewa_account_entity_1 = require("./utility-ewa-account.entity");
let UtilityEwaBill = class UtilityEwaBill extends base_entity_1.AppBaseEntity {
};
exports.UtilityEwaBill = UtilityEwaBill;
__decorate([
    (0, typeorm_1.Column)({ name: 'ewa_account_id', type: 'uuid' }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "ewaAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utility_ewa_account_entity_1.UtilityEwaAccount, (a) => a.bills, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'ewa_account_id' }),
    __metadata("design:type", utility_ewa_account_entity_1.UtilityEwaAccount)
], UtilityEwaBill.prototype, "ewaAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bill_period_from', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "billPeriodFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bill_period_to', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "billPeriodTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bill_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "billDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bill_no', length: 100, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "billNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cap_amount', type: 'numeric', precision: 16, scale: 3, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "capAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cap_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "capDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_amount', type: 'numeric', precision: 16, scale: 3, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "netAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vat_amount', type: 'numeric', precision: 16, scale: 3, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "vatAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_bill', type: 'numeric', precision: 16, scale: 3, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "totalBill", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_due_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "paymentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "paidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_amount', type: 'numeric', precision: 16, scale: 3, default: 0 }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'balance_due', type: 'numeric', precision: 16, scale: 3, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "balanceDue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaBill.prototype, "notes", void 0);
exports.UtilityEwaBill = UtilityEwaBill = __decorate([
    (0, typeorm_1.Entity)({ name: 'utility_ewa_bills' })
], UtilityEwaBill);
//# sourceMappingURL=utility-ewa-bill.entity.js.map