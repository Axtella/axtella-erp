"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_setting_entity_1 = require("./entities/tenant-setting.entity");
const tenant_settings_controller_1 = require("./tenant-settings.controller");
const tenant_settings_service_1 = require("./tenant-settings.service");
let TenantSettingsModule = class TenantSettingsModule {
};
exports.TenantSettingsModule = TenantSettingsModule;
exports.TenantSettingsModule = TenantSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_setting_entity_1.TenantSetting])],
        controllers: [tenant_settings_controller_1.TenantSettingsController],
        providers: [tenant_settings_service_1.TenantSettingsService],
        exports: [tenant_settings_service_1.TenantSettingsService, typeorm_1.TypeOrmModule],
    })
], TenantSettingsModule);
//# sourceMappingURL=tenant-settings.module.js.map