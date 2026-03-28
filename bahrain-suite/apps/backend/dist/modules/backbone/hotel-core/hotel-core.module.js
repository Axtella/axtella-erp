"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelCoreModule = void 0;
const common_1 = require("@nestjs/common");
const hotel_core_controller_1 = require("./hotel-core.controller");
const hotel_core_service_1 = require("./hotel-core.service");
let HotelCoreModule = class HotelCoreModule {
};
exports.HotelCoreModule = HotelCoreModule;
exports.HotelCoreModule = HotelCoreModule = __decorate([
    (0, common_1.Module)({
        controllers: [hotel_core_controller_1.HotelCoreController],
        providers: [hotel_core_service_1.HotelCoreService],
        exports: [hotel_core_service_1.HotelCoreService],
    })
], HotelCoreModule);
//# sourceMappingURL=hotel-core.module.js.map