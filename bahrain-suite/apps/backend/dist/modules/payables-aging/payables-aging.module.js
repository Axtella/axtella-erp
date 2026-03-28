"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayablesAgingModule = void 0;
const common_1 = require("@nestjs/common");
const payables_aging_controller_1 = require("./payables-aging.controller");
const payables_aging_service_1 = require("./payables-aging.service");
let PayablesAgingModule = class PayablesAgingModule {
};
exports.PayablesAgingModule = PayablesAgingModule;
exports.PayablesAgingModule = PayablesAgingModule = __decorate([
    (0, common_1.Module)({
        controllers: [payables_aging_controller_1.PayablesAgingController],
        providers: [payables_aging_service_1.PayablesAgingService],
        exports: [payables_aging_service_1.PayablesAgingService]
    })
], PayablesAgingModule);
//# sourceMappingURL=payables-aging.module.js.map