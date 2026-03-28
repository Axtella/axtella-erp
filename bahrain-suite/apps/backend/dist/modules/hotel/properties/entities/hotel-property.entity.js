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
exports.HotelProperty = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelProperty = class HotelProperty extends base_entity_1.AppBaseEntity {
};
exports.HotelProperty = HotelProperty;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelProperty.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], HotelProperty.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], HotelProperty.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120, nullable: true }),
    __metadata("design:type", String)
], HotelProperty.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code', length: 10, default: 'BH' }),
    __metadata("design:type", String)
], HotelProperty.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: 'Asia/Bahrain' }),
    __metadata("design:type", String)
], HotelProperty.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'active' }),
    __metadata("design:type", String)
], HotelProperty.prototype, "status", void 0);
exports.HotelProperty = HotelProperty = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_properties' })
], HotelProperty);
//# sourceMappingURL=hotel-property.entity.js.map