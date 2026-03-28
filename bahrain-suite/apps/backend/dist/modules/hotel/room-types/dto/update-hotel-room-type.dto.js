"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelRoomTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_room_type_dto_1 = require("./create-hotel-room-type.dto");
class UpdateHotelRoomTypeDto extends (0, mapped_types_1.PartialType)(create_hotel_room_type_dto_1.CreateHotelRoomTypeDto) {
}
exports.UpdateHotelRoomTypeDto = UpdateHotelRoomTypeDto;
//# sourceMappingURL=update-hotel-room-type.dto.js.map