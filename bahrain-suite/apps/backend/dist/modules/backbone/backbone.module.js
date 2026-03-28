"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackboneModule = void 0;
const common_1 = require("@nestjs/common");
const privileged_platform_module_1 = require("./privileged-platform/privileged-platform.module");
const hotel_core_module_1 = require("./hotel-core/hotel-core.module");
const accounting_core_module_1 = require("./accounting-core/accounting-core.module");
const hr_core_module_1 = require("./hr-core/hr-core.module");
const crm_core_module_1 = require("./crm-core/crm-core.module");
let BackboneModule = class BackboneModule {
};
exports.BackboneModule = BackboneModule;
exports.BackboneModule = BackboneModule = __decorate([
    (0, common_1.Module)({
        imports: [
            privileged_platform_module_1.PrivilegedPlatformModule,
            hotel_core_module_1.HotelCoreModule,
            accounting_core_module_1.AccountingCoreModule,
            hr_core_module_1.HrCoreModule,
            crm_core_module_1.CrmCoreModule,
        ],
    })
], BackboneModule);
//# sourceMappingURL=backbone.module.js.map