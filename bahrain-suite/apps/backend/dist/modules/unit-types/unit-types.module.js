"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const unit_type_entity_1 = require("./entities/unit-type.entity");
const unit_types_controller_1 = require("./unit-types.controller");
const unit_types_service_1 = require("./unit-types.service");
let UnitTypesModule = class UnitTypesModule {
};
exports.UnitTypesModule = UnitTypesModule;
exports.UnitTypesModule = UnitTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([unit_type_entity_1.UnitType])],
        controllers: [unit_types_controller_1.UnitTypesController],
        providers: [unit_types_service_1.UnitTypesService],
        exports: [typeorm_1.TypeOrmModule, unit_types_service_1.UnitTypesService],
    })
], UnitTypesModule);
//# sourceMappingURL=unit-types.module.js.map