"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelGuestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_guest_dto_1 = require("./create-hotel-guest.dto");
class UpdateHotelGuestDto extends (0, mapped_types_1.PartialType)(create_hotel_guest_dto_1.CreateHotelGuestDto) {
}
exports.UpdateHotelGuestDto = UpdateHotelGuestDto;
//# sourceMappingURL=update-hotel-guest.dto.js.map