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
exports.UtilityEwaAccount = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const property_entity_1 = require("../../properties/entities/property.entity");
const unit_entity_1 = require("../../units/entities/unit.entity");
const utility_ewa_bill_entity_1 = require("./utility-ewa-bill.entity");
let UtilityEwaAccount = class UtilityEwaAccount extends base_entity_1.AppBaseEntity {
};
exports.UtilityEwaAccount = UtilityEwaAccount;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], UtilityEwaAccount.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], UtilityEwaAccount.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaAccount.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'unit_id' }),
    __metadata("design:type", unit_entity_1.Unit)
], UtilityEwaAccount.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_label', length: 120, nullable: true }),
    __metadata("design:type", String)
], UtilityEwaAccount.prototype, "unitLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ewa_account_no', length: 50 }),
    __metadata("design:type", String)
], UtilityEwaAccount.prototype, "ewaAccountNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UtilityEwaAccount.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => utility_ewa_bill_entity_1.UtilityEwaBill, (b) => b.ewaAccount),
    __metadata("design:type", Array)
], UtilityEwaAccount.prototype, "bills", void 0);
exports.UtilityEwaAccount = UtilityEwaAccount = __decorate([
    (0, typeorm_1.Entity)({ name: 'utility_ewa_accounts' })
], UtilityEwaAccount);
//# sourceMappingURL=utility-ewa-account.entity.js.map