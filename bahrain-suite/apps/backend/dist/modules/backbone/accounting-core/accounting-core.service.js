"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingCoreService = void 0;
const common_1 = require("@nestjs/common");
let AccountingCoreService = class AccountingCoreService {
    getScaffoldStatus() {
        return {
            domain: 'accounting-core',
            phase: 3,
            ready: true,
            modules: [
                'accounts',
                'journals',
                'ar',
                'ap',
                'tax',
                'vat-zatca',
                'bank',
                'reconciliation',
                'fixed-assets',
                'budgets',
                'investor-statements',
                'financial-reports',
            ],
            notes: 'Accounting scaffold is active. Add ledger posting pipeline and close-cycle workflows in feature modules.',
        };
    }
};
exports.AccountingCoreService = AccountingCoreService;
exports.AccountingCoreService = AccountingCoreService = __decorate([
    (0, common_1.Injectable)()
], AccountingCoreService);
//# sourceMappingURL=accounting-core.service.js.map