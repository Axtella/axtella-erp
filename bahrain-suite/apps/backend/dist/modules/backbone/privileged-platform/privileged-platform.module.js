"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegedPlatformModule = void 0;
const common_1 = require("@nestjs/common");
const privileged_platform_controller_1 = require("./privileged-platform.controller");
const privileged_platform_service_1 = require("./privileged-platform.service");
let PrivilegedPlatformModule = class PrivilegedPlatformModule {
};
exports.PrivilegedPlatformModule = PrivilegedPlatformModule;
exports.PrivilegedPlatformModule = PrivilegedPlatformModule = __decorate([
    (0, common_1.Module)({
        controllers: [privileged_platform_controller_1.PrivilegedPlatformController],
        providers: [privileged_platform_service_1.PrivilegedPlatformService],
        exports: [privileged_platform_service_1.PrivilegedPlatformService],
    })
], PrivilegedPlatformModule);
//# sourceMappingURL=privileged-platform.module.js.map