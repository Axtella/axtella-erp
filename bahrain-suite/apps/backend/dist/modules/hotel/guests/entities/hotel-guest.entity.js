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
exports.HotelGuest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelGuest = class HotelGuest extends base_entity_1.AppBaseEntity {
};
exports.HotelGuest = HotelGuest;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelGuest.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guest_no', length: 100 }),
    __metadata("design:type", String)
], HotelGuest.prototype, "guestNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 200 }),
    __metadata("design:type", String)
], HotelGuest.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], HotelGuest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], HotelGuest.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: true }),
    __metadata("design:type", String)
], HotelGuest.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'active' }),
    __metadata("design:type", String)
], HotelGuest.prototype, "status", void 0);
exports.HotelGuest = HotelGuest = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_guests' })
], HotelGuest);
//# sourceMappingURL=hotel-guest.entity.js.map