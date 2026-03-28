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
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let Property = class Property extends base_entity_1.AppBaseEntity {
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], Property.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Property.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_type', length: 50 }),
    __metadata("design:type", String)
], Property.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: 'Bahrain' }),
    __metadata("design:type", String)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'investor_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "investorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'owner_rent_monthly', type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Property.prototype, "ownerRentMonthly", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operation_start_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "operationStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'active' }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accent_color', length: 7, nullable: true }),
    __metadata("design:type", String)
], Property.prototype, "accentColor", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)({ name: 'properties' })
], Property);
//# sourceMappingURL=property.entity.js.map