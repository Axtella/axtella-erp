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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
const unit_type_entity_1 = require("../../unit-types/entities/unit-type.entity");
let Unit = class Unit extends base_entity_1.AppBaseEntity {
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], Unit.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_center_id', type: 'uuid' }),
    __metadata("design:type", String)
], Unit.prototype, "costCenterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_type_id', type: 'uuid' }),
    __metadata("design:type", String)
], Unit.prototype, "unitTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_type_entity_1.UnitType),
    (0, typeorm_1.JoinColumn)({ name: 'unit_type_id' }),
    __metadata("design:type", unit_type_entity_1.UnitType)
], Unit.prototype, "unitType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_no', length: 50 }),
    __metadata("design:type", String)
], Unit.prototype, "unitNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'area_sq_m', type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Unit.prototype, "areaSqM", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bedroom_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "bedroomCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bathroom_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "bathroomCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_occupancy', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Unit.prototype, "maxOccupancy", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'vacant' }),
    __metadata("design:type", String)
], Unit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_daily_rate', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "defaultDailyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'default_monthly_rate', type: 'numeric', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Unit.prototype, "defaultMonthlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Unit.prototype, "notes", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)({ name: 'units' }),
    (0, typeorm_1.Index)(['propertyId', 'unitNo'], { unique: true })
], Unit);
//# sourceMappingURL=unit.entity.js.map