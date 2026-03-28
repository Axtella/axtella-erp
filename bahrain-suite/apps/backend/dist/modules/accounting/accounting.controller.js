"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const accounting_service_1 = require("./accounting.service");
const coa_account_heads_service_1 = require("./coa-account-heads.service");
const create_journal_entry_dto_1 = require("./dto/create-journal-entry.dto");
const create_coa_account_head_dto_1 = require("./dto/create-coa-account-head.dto");
const update_coa_account_head_dto_1 = require("./dto/update-coa-account-head.dto");
const find_coa_account_heads_dto_1 = require("./dto/find-coa-account-heads.dto");
const find_journals_dto_1 = require("./dto/find-journals.dto");
const find_trial_balance_dto_1 = require("./dto/find-trial-balance.dto");
const income_channels_1 = require("./income-channels");
const FINANCE_READ_ROLES = [
    user_role_enum_1.UserRole.ADMIN,
    user_role_enum_1.UserRole.ACCOUNTANT,
    user_role_enum_1.UserRole.HR,
    user_role_enum_1.UserRole.DEVELOPER,
    user_role_enum_1.UserRole.STAFF,
];
let AccountingController = class AccountingController {
    constructor(service, coaHeads) {
        this.service = service;
        this.coaHeads = coaHeads;
    }
    listCoaAccountHeads(query) {
        return this.coaHeads.findAll(query);
    }
    createCoaAccountHead(dto) {
        return this.coaHeads.create(dto);
    }
    updateCoaAccountHead(id, dto) {
        return this.coaHeads.update(id, dto);
    }
    removeCoaAccountHead(id) {
        return this.coaHeads.remove(id);
    }
    trialBalance(q) {
        return this.service.trialBalance(q.from, q.to, q.propertyId);
    }
    async trialBalanceExport(q) {
        const buf = await this.service.buildTrialBalanceXlsx(q.from, q.to, q.propertyId);
        const name = `trial-balance-${q.from}_to_${q.to}.xlsx`;
        return new common_1.StreamableFile(buf, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            disposition: `attachment; filename="${name}"`,
        });
    }
    journals(query) {
        return this.service.findJournals(query);
    }
    daybook(query) {
        return this.service.daybook(query);
    }
    journalById(id) {
        return this.service.findJournalById(id);
    }
    createJournal(dto) {
        return this.service.createJournal(dto);
    }
    incomeExpense(propertyId, month, year, channelsRaw) {
        const channels = (0, income_channels_1.parseIncomeChannelList)(channelsRaw);
        return this.service.incomeExpenseStatement(propertyId, month, year, channels);
    }
    monthlyPnl(propertyId, month, year) {
        return this.service.monthlyPnl(propertyId, month, year);
    }
    async exportMonthlyPnl(propertyId, month, year) {
        const buf = await this.service.buildMonthlyPnlXlsx(propertyId, month, year);
        const name = `pnl-${propertyId.slice(0, 8)}-${year}-${String(month).padStart(2, '0')}.xlsx`;
        return new common_1.StreamableFile(buf, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            disposition: `attachment; filename="${name}"`,
        });
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('coa/account-heads'),
    (0, swagger_1.ApiOperation)({ summary: 'List chart of account heads (codes for journal posting)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_coa_account_heads_dto_1.FindCoaAccountHeadsDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "listCoaAccountHeads", null);
__decorate([
    (0, common_1.Post)('coa/account-heads'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    (0, swagger_1.ApiOperation)({ summary: 'Create an account head in the chart of accounts' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coa_account_head_dto_1.CreateCoaAccountHeadDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createCoaAccountHead", null);
__decorate([
    (0, common_1.Patch)('coa/account-heads/:id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    (0, swagger_1.ApiOperation)({ summary: 'Update an account head' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coa_account_head_dto_1.UpdateCoaAccountHeadDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "updateCoaAccountHead", null);
__decorate([
    (0, common_1.Delete)('coa/account-heads/:id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Remove an account head (admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "removeCoaAccountHead", null);
__decorate([
    (0, common_1.Get)('trial-balance'),
    (0, swagger_1.ApiOperation)({ summary: 'Trial balance by account for date range (posted journals)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_trial_balance_dto_1.FindTrialBalanceDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "trialBalance", null);
__decorate([
    (0, common_1.Get)('trial-balance/export'),
    (0, swagger_1.ApiOperation)({ summary: 'Trial balance as Excel (.xlsx)' }),
    (0, swagger_1.ApiProduces)('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_trial_balance_dto_1.FindTrialBalanceDto]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "trialBalanceExport", null);
__decorate([
    (0, common_1.Get)('journals'),
    (0, swagger_1.ApiOperation)({ summary: 'List journal entries (optionally filter by property and date)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_journals_dto_1.FindJournalsDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "journals", null);
__decorate([
    (0, common_1.Get)('journals/daybook'),
    (0, swagger_1.ApiOperation)({ summary: 'Daybook view: journals in chronological order for the filter' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_journals_dto_1.FindJournalsDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "daybook", null);
__decorate([
    (0, common_1.Get)('journals/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Journal entry with lines' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "journalById", null);
__decorate([
    (0, common_1.Post)('journals'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    (0, swagger_1.ApiOperation)({ summary: 'Post a balanced journal (double-entry)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journal_entry_dto_1.CreateJournalEntryDto]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createJournal", null);
__decorate([
    (0, common_1.Get)('income-expense'),
    (0, swagger_1.ApiOperation)({
        summary: 'Income & expense statement; filter revenue by channels (comma: cash_receipt,pos,benefit_pay,untagged)',
    }),
    __param(0, (0, common_1.Query)('propertyId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('channels')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "incomeExpense", null);
__decorate([
    (0, common_1.Get)('pnl/monthly'),
    (0, swagger_1.ApiOperation)({ summary: 'Monthly P&L from posted lines (COA mapping in code)' }),
    __param(0, (0, common_1.Query)('propertyId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "monthlyPnl", null);
__decorate([
    (0, common_1.Get)('pnl/monthly/export'),
    (0, swagger_1.ApiOperation)({ summary: 'Download monthly P&L + journal lines as .xlsx' }),
    (0, swagger_1.ApiProduces)('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    __param(0, (0, common_1.Query)('propertyId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AccountingController.prototype, "exportMonthlyPnl", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('accounting'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('accounting'),
    (0, roles_decorator_1.Roles)(...FINANCE_READ_ROLES),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService,
        coa_account_heads_service_1.CoaAccountHeadsService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map