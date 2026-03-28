"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelRoomDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_room_dto_1 = require("./create-hotel-room.dto");
class UpdateHotelRoomDto extends (0, mapped_types_1.PartialType)(create_hotel_room_dto_1.CreateHotelRoomDto) {
}
exports.UpdateHotelRoomDto = UpdateHotelRoomDto;
//# sourceMappingURL=update-hotel-room.dto.js.map