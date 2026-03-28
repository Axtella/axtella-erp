"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetVsActualModule = void 0;
const common_1 = require("@nestjs/common");
const budget_vs_actual_controller_1 = require("./budget-vs-actual.controller");
const budget_vs_actual_service_1 = require("./budget-vs-actual.service");
let BudgetVsActualModule = class BudgetVsActualModule {
};
exports.BudgetVsActualModule = BudgetVsActualModule;
exports.BudgetVsActualModule = BudgetVsActualModule = __decorate([
    (0, common_1.Module)({
        controllers: [budget_vs_actual_controller_1.BudgetVsActualController],
        providers: [budget_vs_actual_service_1.BudgetVsActualService],
        exports: [budget_vs_actual_service_1.BudgetVsActualService]
    })
], BudgetVsActualModule);
//# sourceMappingURL=budget-vs-actual.module.js.map