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
exports.HotelRoom = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelRoom = class HotelRoom extends base_entity_1.AppBaseEntity {
};
exports.HotelRoom = HotelRoom;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelRoom.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelRoom.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_type_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelRoom.prototype, "roomTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_no', length: 50 }),
    __metadata("design:type", String)
], HotelRoom.prototype, "roomNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'floor_label', length: 30, nullable: true }),
    __metadata("design:type", String)
], HotelRoom.prototype, "floorLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'vacant' }),
    __metadata("design:type", String)
], HotelRoom.prototype, "status", void 0);
exports.HotelRoom = HotelRoom = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_rooms' })
], HotelRoom);
//# sourceMappingURL=hotel-room.entity.js.map