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
exports.CostCenter = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const property_entity_1 = require("../../properties/entities/property.entity");
let CostCenter = class CostCenter extends base_entity_1.AppBaseEntity {
};
exports.CostCenter = CostCenter;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], CostCenter.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], CostCenter.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], CostCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_center_type', length: 50 }),
    __metadata("design:type", String)
], CostCenter.prototype, "costCenterType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], CostCenter.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, { nullable: false, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], CostCenter.prototype, "property", void 0);
exports.CostCenter = CostCenter = __decorate([
    (0, typeorm_1.Entity)({ name: 'cost_centers' }),
    (0, typeorm_1.Index)(['propertyId', 'code'], { unique: true })
], CostCenter);
//# sourceMappingURL=cost-center.entity.js.map