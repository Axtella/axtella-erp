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
exports.HotelReservation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelReservation = class HotelReservation extends base_entity_1.AppBaseEntity {
};
exports.HotelReservation = HotelReservation;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guest_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], HotelReservation.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reservation_no', length: 100 }),
    __metadata("design:type", String)
], HotelReservation.prototype, "reservationNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'arrival_date', type: 'date' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "arrivalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'departure_date', type: 'date' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], HotelReservation.prototype, "adults", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], HotelReservation.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'reserved' }),
    __metadata("design:type", String)
], HotelReservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HotelReservation.prototype, "notes", void 0);
exports.HotelReservation = HotelReservation = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_reservations' })
], HotelReservation);
//# sourceMappingURL=hotel-reservation.entity.js.map