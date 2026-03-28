"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernmentPaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const government_payments_controller_1 = require("./government-payments.controller");
const government_payments_service_1 = require("./government-payments.service");
let GovernmentPaymentsModule = class GovernmentPaymentsModule {
};
exports.GovernmentPaymentsModule = GovernmentPaymentsModule;
exports.GovernmentPaymentsModule = GovernmentPaymentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [government_payments_controller_1.GovernmentPaymentsController],
        providers: [government_payments_service_1.GovernmentPaymentsService],
        exports: [government_payments_service_1.GovernmentPaymentsService]
    })
], GovernmentPaymentsModule);
//# sourceMappingURL=government-payments.module.js.map