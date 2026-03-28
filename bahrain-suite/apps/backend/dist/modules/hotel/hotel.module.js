"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModule = void 0;
const common_1 = require("@nestjs/common");
const guests_module_1 = require("./guests/guests.module");
const housekeeping_module_1 = require("./housekeeping/housekeeping.module");
const properties_module_1 = require("./properties/properties.module");
const reservations_module_1 = require("./reservations/reservations.module");
const room_types_module_1 = require("./room-types/room-types.module");
const rooms_module_1 = require("./rooms/rooms.module");
let HotelModule = class HotelModule {
};
exports.HotelModule = HotelModule;
exports.HotelModule = HotelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            properties_module_1.HotelPropertiesModule,
            room_types_module_1.HotelRoomTypesModule,
            rooms_module_1.HotelRoomsModule,
            guests_module_1.HotelGuestsModule,
            reservations_module_1.HotelReservationsModule,
            housekeeping_module_1.HotelHousekeepingModule,
        ],
    })
], HotelModule);
//# sourceMappingURL=hotel.module.js.map