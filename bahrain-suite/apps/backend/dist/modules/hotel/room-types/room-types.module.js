"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_room_type_entity_1 = require("./entities/hotel-room-type.entity");
const room_types_controller_1 = require("./room-types.controller");
const room_types_service_1 = require("./room-types.service");
let HotelRoomTypesModule = class HotelRoomTypesModule {
};
exports.HotelRoomTypesModule = HotelRoomTypesModule;
exports.HotelRoomTypesModule = HotelRoomTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hotel_room_type_entity_1.HotelRoomType])],
        controllers: [room_types_controller_1.HotelRoomTypesController],
        providers: [room_types_service_1.HotelRoomTypesService],
        exports: [room_types_service_1.HotelRoomTypesService, typeorm_1.TypeOrmModule],
    })
], HotelRoomTypesModule);
//# sourceMappingURL=room-types.module.js.map