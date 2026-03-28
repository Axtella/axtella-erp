"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivablesAgingModule = void 0;
const common_1 = require("@nestjs/common");
const receivables_aging_controller_1 = require("./receivables-aging.controller");
const receivables_aging_service_1 = require("./receivables-aging.service");
let ReceivablesAgingModule = class ReceivablesAgingModule {
};
exports.ReceivablesAgingModule = ReceivablesAgingModule;
exports.ReceivablesAgingModule = ReceivablesAgingModule = __decorate([
    (0, common_1.Module)({
        controllers: [receivables_aging_controller_1.ReceivablesAgingController],
        providers: [receivables_aging_service_1.ReceivablesAgingService],
        exports: [receivables_aging_service_1.ReceivablesAgingService]
    })
], ReceivablesAgingModule);
//# sourceMappingURL=receivables-aging.module.js.map