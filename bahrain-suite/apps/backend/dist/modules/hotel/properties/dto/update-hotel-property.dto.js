"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHotelPropertyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hotel_property_dto_1 = require("./create-hotel-property.dto");
class UpdateHotelPropertyDto extends (0, mapped_types_1.PartialType)(create_hotel_property_dto_1.CreateHotelPropertyDto) {
}
exports.UpdateHotelPropertyDto = UpdateHotelPropertyDto;
//# sourceMappingURL=update-hotel-property.dto.js.map