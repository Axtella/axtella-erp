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
exports.GovernmentPayment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let GovernmentPayment = class GovernmentPayment extends base_entity_1.AppBaseEntity {
};
exports.GovernmentPayment = GovernmentPayment;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], GovernmentPayment.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_type', length: 50 }),
    __metadata("design:type", String)
], GovernmentPayment.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], GovernmentPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'unpaid' }),
    __metadata("design:type", String)
], GovernmentPayment.prototype, "status", void 0);
exports.GovernmentPayment = GovernmentPayment = __decorate([
    (0, typeorm_1.Entity)({ name: 'government_payments' })
], GovernmentPayment);
//# sourceMappingURL=government-payment.entity.js.map