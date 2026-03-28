"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostCentersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cost_center_entity_1 = require("./entities/cost-center.entity");
const cost_centers_service_1 = require("./cost-centers.service");
const cost_centers_controller_1 = require("./cost-centers.controller");
const property_entity_1 = require("../properties/entities/property.entity");
let CostCentersModule = class CostCentersModule {
};
exports.CostCentersModule = CostCentersModule;
exports.CostCentersModule = CostCentersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cost_center_entity_1.CostCenter, property_entity_1.Property])],
        controllers: [cost_centers_controller_1.CostCentersController],
        providers: [cost_centers_service_1.CostCentersService],
        exports: [typeorm_1.TypeOrmModule, cost_centers_service_1.CostCentersService],
    })
], CostCentersModule);
//# sourceMappingURL=cost-centers.module.js.map