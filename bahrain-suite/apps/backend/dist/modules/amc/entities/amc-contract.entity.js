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
exports.AmcContract = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let AmcContract = class AmcContract extends base_entity_1.AppBaseEntity {
};
exports.AmcContract = AmcContract;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], AmcContract.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amc_type', length: 50 }),
    __metadata("design:type", String)
], AmcContract.prototype, "amcType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_name', length: 200 }),
    __metadata("design:type", String)
], AmcContract.prototype, "vendorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_value', type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], AmcContract.prototype, "contractValue", void 0);
exports.AmcContract = AmcContract = __decorate([
    (0, typeorm_1.Entity)({ name: 'amc_contracts' })
], AmcContract);
//# sourceMappingURL=amc-contract.entity.js.map