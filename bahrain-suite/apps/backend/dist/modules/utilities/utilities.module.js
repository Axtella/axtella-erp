"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../properties/entities/property.entity");
const unit_entity_1 = require("../units/entities/unit.entity");
const utility_ewa_account_entity_1 = require("./entities/utility-ewa-account.entity");
const utility_ewa_bill_entity_1 = require("./entities/utility-ewa-bill.entity");
const utilities_controller_1 = require("./utilities.controller");
const utilities_service_1 = require("./utilities.service");
let UtilitiesModule = class UtilitiesModule {
};
exports.UtilitiesModule = UtilitiesModule;
exports.UtilitiesModule = UtilitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                utility_ewa_account_entity_1.UtilityEwaAccount,
                utility_ewa_bill_entity_1.UtilityEwaBill,
                property_entity_1.Property,
                unit_entity_1.Unit,
            ]),
        ],
        controllers: [utilities_controller_1.UtilitiesController],
        providers: [utilities_service_1.UtilitiesService],
        exports: [utilities_service_1.UtilitiesService],
    })
], UtilitiesModule);
//# sourceMappingURL=utilities.module.js.map