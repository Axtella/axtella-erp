"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_room_entity_1 = require("./entities/hotel-room.entity");
const rooms_controller_1 = require("./rooms.controller");
const rooms_service_1 = require("./rooms.service");
let HotelRoomsModule = class HotelRoomsModule {
};
exports.HotelRoomsModule = HotelRoomsModule;
exports.HotelRoomsModule = HotelRoomsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hotel_room_entity_1.HotelRoom])],
        controllers: [rooms_controller_1.HotelRoomsController],
        providers: [rooms_service_1.HotelRoomsService],
        exports: [rooms_service_1.HotelRoomsService, typeorm_1.TypeOrmModule],
    })
], HotelRoomsModule);
//# sourceMappingURL=rooms.module.js.map