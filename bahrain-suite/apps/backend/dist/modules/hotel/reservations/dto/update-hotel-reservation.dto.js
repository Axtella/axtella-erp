"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelReservationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_reservation_dto_1 = require("./create-hotel-reservation.dto");
class UpdateHotelReservationDto extends (0, mapped_types_1.PartialType)(create_hotel_reservation_dto_1.CreateHotelReservationDto) {
}
exports.UpdateHotelReservationDto = UpdateHotelReservationDto;
//# sourceMappingURL=update-hotel-reservation.dto.js.map