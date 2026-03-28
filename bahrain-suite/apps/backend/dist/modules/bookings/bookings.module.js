"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const booking_guest_entity_1 = require("./entities/booking-guest.entity");
const checkin_checkout_log_entity_1 = require("./entities/checkin-checkout-log.entity");
const bookings_controller_1 = require("./bookings.controller");
const bookings_service_1 = require("./bookings.service");
const property_entity_1 = require("../properties/entities/property.entity");
const cost_center_entity_1 = require("../cost-centers/entities/cost-center.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const unit_type_entity_1 = require("../unit-types/entities/unit-type.entity");
let BookingsModule = class BookingsModule {
};
exports.BookingsModule = BookingsModule;
exports.BookingsModule = BookingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                booking_entity_1.Booking,
                booking_guest_entity_1.BookingGuest,
                checkin_checkout_log_entity_1.CheckinCheckoutLog,
                property_entity_1.Property,
                cost_center_entity_1.CostCenter,
                unit_entity_1.Unit,
                unit_type_entity_1.UnitType,
                tenant_entity_1.Tenant,
            ]),
        ],
        controllers: [bookings_controller_1.BookingsController],
        providers: [bookings_service_1.BookingsService],
        exports: [typeorm_1.TypeOrmModule, bookings_service_1.BookingsService],
    })
], BookingsModule);
//# sourceMappingURL=bookings.module.js.map