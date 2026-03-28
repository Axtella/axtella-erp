"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_feature_flag_entity_1 = require("./entities/customer-feature-flag.entity");
const feature_flags_controller_1 = require("./feature-flags.controller");
const feature_flags_service_1 = require("./feature-flags.service");
let FeatureFlagsModule = class FeatureFlagsModule {
};
exports.FeatureFlagsModule = FeatureFlagsModule;
exports.FeatureFlagsModule = FeatureFlagsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_feature_flag_entity_1.CustomerFeatureFlag])],
        controllers: [feature_flags_controller_1.FeatureFlagsController],
        providers: [feature_flags_service_1.FeatureFlagsService],
        exports: [feature_flags_service_1.FeatureFlagsService, typeorm_1.TypeOrmModule],
    })
], FeatureFlagsModule);
//# sourceMappingURL=feature-flags.module.js.map