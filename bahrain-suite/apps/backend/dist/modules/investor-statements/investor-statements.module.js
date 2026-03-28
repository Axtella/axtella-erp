"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorStatementsModule = void 0;
const common_1 = require("@nestjs/common");
const investor_statements_controller_1 = require("./investor-statements.controller");
const investor_statements_service_1 = require("./investor-statements.service");
let InvestorStatementsModule = class InvestorStatementsModule {
};
exports.InvestorStatementsModule = InvestorStatementsModule;
exports.InvestorStatementsModule = InvestorStatementsModule = __decorate([
    (0, common_1.Module)({
        controllers: [investor_statements_controller_1.InvestorStatementsController],
        providers: [investor_statements_service_1.InvestorStatementsService],
        exports: [investor_statements_service_1.InvestorStatementsService]
    })
], InvestorStatementsModule);
//# sourceMappingURL=investor-statements.module.js.map