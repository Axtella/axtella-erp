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
exports.HotelRoomType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelRoomType = class HotelRoomType extends base_entity_1.AppBaseEntity {
};
exports.HotelRoomType = HotelRoomType;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelRoomType.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelRoomType.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], HotelRoomType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name_i18n', type: 'jsonb', default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], HotelRoomType.prototype, "nameI18n", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], HotelRoomType.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_occupancy', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], HotelRoomType.prototype, "maxOccupancy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], HotelRoomType.prototype, "isActive", void 0);
exports.HotelRoomType = HotelRoomType = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_room_types' })
], HotelRoomType);
//# sourceMappingURL=hotel-room-type.entity.js.map