"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedAssetsModule = void 0;
const common_1 = require("@nestjs/common");
const fixed_assets_controller_1 = require("./fixed-assets.controller");
const fixed_assets_service_1 = require("./fixed-assets.service");
let FixedAssetsModule = class FixedAssetsModule {
};
exports.FixedAssetsModule = FixedAssetsModule;
exports.FixedAssetsModule = FixedAssetsModule = __decorate([
    (0, common_1.Module)({
        controllers: [fixed_assets_controller_1.FixedAssetsController],
        providers: [fixed_assets_service_1.FixedAssetsService],
        exports: [fixed_assets_service_1.FixedAssetsService]
    })
], FixedAssetsModule);
//# sourceMappingURL=fixed-assets.module.js.map