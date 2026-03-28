"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ExcelJS = __importStar(require("exceljs"));
const product_branding_1 = require("../../common/product-branding");
const property_entity_1 = require("../properties/entities/property.entity");
const journal_entry_entity_1 = require("./entities/journal-entry.entity");
const journal_line_entity_1 = require("./entities/journal-line.entity");
const pnl_account_map_1 = require("./pnl-account-map");
const income_channels_1 = require("./income-channels");
const BALANCE_EPS = 0.01;
let AccountingService = class AccountingService {
    constructor(entryRepo, lineRepo, propertyRepo) {
        this.entryRepo = entryRepo;
        this.lineRepo = lineRepo;
        this.propertyRepo = propertyRepo;
    }
    sumDebitCredit(lines) {
        const td = lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
        const tc = lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
        return { totalDebit: td, totalCredit: tc };
    }
    assertBalanced(lines) {
        const { totalDebit, totalCredit } = this.sumDebitCredit(lines);
        if (Math.abs(totalDebit - totalCredit) > BALANCE_EPS) {
            throw new common_1.BadRequestException(`Journal must balance: total debit ${totalDebit} vs credit ${totalCredit}`);
        }
    }
    assertLineShape(lines) {
        for (const l of lines) {
            const d = Number(l.debit) || 0;
            const c = Number(l.credit) || 0;
            if (d < 0 || c < 0) {
                throw new common_1.BadRequestException('Debit and credit must be non-negative');
            }
            if (d > 0 && c > 0) {
                throw new common_1.BadRequestException('Each line must post to either debit or credit, not both');
            }
            if (d === 0 && c === 0) {
                throw new common_1.BadRequestException('Each line must have a non-zero amount');
            }
        }
    }
    monthBounds(month, year) {
        const from = `${year}-${String(month).padStart(2, '0')}-01`;
        const last = new Date(year, month, 0).getDate();
        const to = `${year}-${String(month).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
        return { from, to };
    }
    async createJournal(dto) {
        if (!dto.lines?.length) {
            throw new common_1.BadRequestException('At least one journal line is required');
        }
        this.assertLineShape(dto.lines);
        this.assertBalanced(dto.lines);
        if (dto.propertyId) {
            const prop = await this.propertyRepo.findOne({
                where: { id: dto.propertyId },
            });
            if (!prop) {
                throw new common_1.BadRequestException('Property not found');
            }
        }
        const journalNo = await this.generateJournalNo(dto.propertyId);
        return this.entryRepo.manager.transaction(async (em) => {
            const entry = em.create(journal_entry_entity_1.JournalEntry, {
                journalNo,
                entryDate: dto.entryDate,
                propertyId: dto.propertyId,
                narration: dto.narration,
            });
            await em.save(entry);
            for (const line of dto.lines) {
                await em.save(em.create(journal_line_entity_1.JournalLine, {
                    journalEntryId: entry.id,
                    accountCode: line.accountCode.trim(),
                    debit: line.debit,
                    credit: line.credit,
                    incomeChannel: line.incomeChannel,
                }));
            }
            return this.findJournalById(entry.id);
        });
    }
    async generateJournalNo(propertyId) {
        const prefix = propertyId
            ? `P-${propertyId.slice(0, 8).toUpperCase()}`
            : 'CO';
        const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
        return `${prefix}-${stamp}-${rnd}`;
    }
    async findJournals(query) {
        const qb = this.entryRepo
            .createQueryBuilder('je')
            .orderBy('je.entryDate', 'DESC')
            .addOrderBy('je.createdAt', 'DESC');
        if (query.propertyId) {
            qb.andWhere('je.propertyId = :pid', { pid: query.propertyId });
        }
        if (query.from) {
            qb.andWhere('je.entryDate >= :from', { from: query.from });
        }
        if (query.to) {
            qb.andWhere('je.entryDate <= :to', { to: query.to });
        }
        const items = await qb.getMany();
        const withLines = await Promise.all(items.map(async (e) => ({
            ...e,
            lines: await this.lineRepo.find({
                where: { journalEntryId: e.id },
                order: { createdAt: 'ASC' },
            }),
        })));
        return { items: withLines, total: withLines.length };
    }
    async daybook(query) {
        const res = await this.findJournals(query);
        const items = [...res.items].sort((a, b) => {
            const da = String(a.entryDate).localeCompare(String(b.entryDate));
            if (da !== 0)
                return da;
            return String(a.createdAt).localeCompare(String(b.createdAt));
        });
        return { items, total: items.length };
    }
    async findJournalById(id) {
        const entry = await this.entryRepo.findOne({ where: { id } });
        if (!entry) {
            throw new common_1.NotFoundException('Journal entry not found');
        }
        const lines = await this.lineRepo.find({
            where: { journalEntryId: id },
            order: { createdAt: 'ASC' },
        });
        return { ...entry, lines };
    }
    async monthlyPnl(propertyId, month, year) {
        return this.buildPnlResult(propertyId, month, year);
    }
    async loadLinesForMonth(propertyId, month, year) {
        const { from, to } = this.monthBounds(month, year);
        const qb = this.entryRepo
            .createQueryBuilder('je')
            .where('je.entryDate >= :from AND je.entryDate <= :to', { from, to });
        if (propertyId) {
            qb.andWhere('je.propertyId = :pid', { pid: propertyId });
        }
        const entries = await qb.getMany();
        if (!entries.length) {
            return [];
        }
        const ids = entries.map((e) => e.id);
        return this.lineRepo.find({
            where: { journalEntryId: (0, typeorm_2.In)(ids) },
        });
    }
    async buildPnlResult(propertyId, month, year) {
        const lines = await this.loadLinesForMonth(propertyId, month, year);
        const revenue = {
            residential: 0,
            commercial: 0,
            other: 0,
        };
        const expenses = {
            payroll: 0,
            utilities: 0,
            amc: 0,
            government: 0,
            ownerRent: 0,
            maintenance: 0,
            other: 0,
        };
        for (const line of lines) {
            const { classification, amount } = (0, pnl_account_map_1.lineSignedPnlAmount)(line.accountCode, Number(line.debit), Number(line.credit));
            if (classification.kind === 'revenue' && classification.revenueKey) {
                revenue[classification.revenueKey] += amount;
            }
            else if (classification.kind === 'expense' &&
                classification.expenseKey) {
                expenses[classification.expenseKey] += amount;
            }
        }
        const totalRev = revenue.residential + revenue.commercial + revenue.other;
        const totalExp = expenses.payroll +
            expenses.utilities +
            expenses.amc +
            expenses.government +
            expenses.ownerRent +
            expenses.maintenance +
            expenses.other;
        const netProfitLoss = totalRev - totalExp;
        return {
            propertyId,
            month,
            year,
            revenue,
            expenses,
            netProfitLoss,
            _basis: 'Posted journal lines; COA mapping in pnl-account-map.ts (Excel-style buckets).',
        };
    }
    async buildMonthlyPnlXlsx(propertyId, month, year) {
        const pnl = await this.buildPnlResult(propertyId, month, year);
        const { from, to } = this.monthBounds(month, year);
        const daybook = await this.findJournals({ propertyId, from, to });
        const wb = new ExcelJS.Workbook();
        wb.creator = product_branding_1.PRODUCT_COMPANY_NAME;
        wb.created = new Date();
        const ws1 = wb.addWorksheet('P_L_Monthly', {
            views: [{ state: 'frozen', ySplit: 1 }],
        });
        ws1.columns = [
            { header: 'Section', key: 'section', width: 18 },
            { header: 'Line', key: 'line', width: 22 },
            { header: 'Amount', key: 'amount', width: 16 },
        ];
        ws1.getRow(1).font = { bold: true };
        ws1.addRow({ section: 'Revenue', line: 'Residential', amount: pnl.revenue.residential });
        ws1.addRow({ section: 'Revenue', line: 'Commercial', amount: pnl.revenue.commercial });
        ws1.addRow({ section: 'Revenue', line: 'Other', amount: pnl.revenue.other });
        ws1.addRow({ section: 'Expense', line: 'Payroll', amount: pnl.expenses.payroll });
        ws1.addRow({ section: 'Expense', line: 'Utilities', amount: pnl.expenses.utilities });
        ws1.addRow({ section: 'Expense', line: 'AMC', amount: pnl.expenses.amc });
        ws1.addRow({ section: 'Expense', line: 'Government', amount: pnl.expenses.government });
        ws1.addRow({ section: 'Expense', line: 'Owner rent', amount: pnl.expenses.ownerRent });
        ws1.addRow({ section: 'Expense', line: 'Maintenance', amount: pnl.expenses.maintenance });
        ws1.addRow({ section: 'Expense', line: 'Other', amount: pnl.expenses.other });
        ws1.addRow({ section: 'Result', line: 'Net P&L', amount: pnl.netProfitLoss });
        ws1.getColumn('amount').numFmt = '#,##0.00';
        const ws2 = wb.addWorksheet('Journal_lines', {
            views: [{ state: 'frozen', ySplit: 1 }],
        });
        ws2.columns = [
            { header: 'JournalNo', key: 'journalNo', width: 28 },
            { header: 'EntryDate', key: 'entryDate', width: 12 },
            { header: 'Account', key: 'accountCode', width: 14 },
            { header: 'Debit', key: 'debit', width: 14 },
            { header: 'Credit', key: 'credit', width: 14 },
            { header: 'Narration', key: 'narration', width: 40 },
        ];
        ws2.getRow(1).font = { bold: true };
        for (const je of daybook.items) {
            for (const jl of je.lines || []) {
                ws2.addRow({
                    journalNo: je.journalNo,
                    entryDate: je.entryDate,
                    accountCode: jl.accountCode,
                    debit: Number(jl.debit),
                    credit: Number(jl.credit),
                    narration: je.narration || '',
                });
            }
        }
        ws2.getColumn('debit').numFmt = '#,##0.00';
        ws2.getColumn('credit').numFmt = '#,##0.00';
        const buf = await wb.xlsx.writeBuffer();
        return Buffer.from(buf);
    }
    async trialBalance(from, to, propertyId) {
        const qb = this.lineRepo
            .createQueryBuilder('jl')
            .innerJoin(journal_entry_entity_1.JournalEntry, 'je', 'je.id = jl.journalEntryId')
            .select('jl.accountCode', 'accountCode')
            .addSelect('COALESCE(SUM(CAST(jl.debit AS DECIMAL)), 0)', 'totalDebit')
            .addSelect('COALESCE(SUM(CAST(jl.credit AS DECIMAL)), 0)', 'totalCredit')
            .where('je.entryDate >= :from AND je.entryDate <= :to', { from, to })
            .groupBy('jl.accountCode')
            .orderBy('jl.accountCode', 'ASC');
        if (propertyId) {
            qb.andWhere('je.propertyId = :pid', { pid: propertyId });
        }
        const raw = await qb.getRawMany();
        const rows = raw.map((r) => {
            const td = Number(r.totalDebit);
            const tc = Number(r.totalCredit);
            return {
                accountCode: r.accountCode,
                totalDebit: td,
                totalCredit: tc,
                netDebit: Math.max(0, td - tc),
                netCredit: Math.max(0, tc - td),
            };
        });
        const totalDebit = rows.reduce((s, x) => s + x.totalDebit, 0);
        const totalCredit = rows.reduce((s, x) => s + x.totalCredit, 0);
        return {
            from,
            to,
            propertyId: propertyId ?? null,
            rows,
            totalDebit,
            totalCredit,
            difference: totalDebit - totalCredit,
        };
    }
    async buildTrialBalanceXlsx(from, to, propertyId) {
        const tb = await this.trialBalance(from, to, propertyId);
        const wb = new ExcelJS.Workbook();
        wb.creator = product_branding_1.PRODUCT_COMPANY_NAME;
        wb.created = new Date();
        const ws = wb.addWorksheet('Trial_Balance', {
            views: [{ state: 'frozen', ySplit: 3 }],
        });
        ws.mergeCells('A1:E1');
        ws.getCell('A1').value = product_branding_1.PRODUCT_COMPANY_NAME;
        ws.getCell('A1').font = { bold: true, size: 14 };
        ws.getCell('A2').value = `Trial balance · ${from} to ${to}${propertyId ? ` · property ${propertyId.slice(0, 8)}…` : ''}`;
        ws.addRow([]);
        const header = ws.addRow([
            'Account',
            'Debit',
            'Credit',
            'Net DR',
            'Net CR',
        ]);
        header.font = { bold: true };
        for (const r of tb.rows) {
            ws.addRow([
                r.accountCode,
                r.totalDebit,
                r.totalCredit,
                r.netDebit,
                r.netCredit,
            ]);
        }
        const t = ws.addRow([
            'Totals',
            tb.totalDebit,
            tb.totalCredit,
            '',
            '',
        ]);
        t.font = { bold: true };
        ws.getColumn(2).numFmt = '#,##0.00';
        ws.getColumn(3).numFmt = '#,##0.00';
        ws.getColumn(4).numFmt = '#,##0.00';
        ws.getColumn(5).numFmt = '#,##0.00';
        const buf = await wb.xlsx.writeBuffer();
        return Buffer.from(buf);
    }
    async incomeExpenseStatement(propertyId, month, year, channelFilter) {
        const lines = await this.loadLinesForMonth(propertyId, month, year);
        const expenses = {
            payroll: 0,
            utilities: 0,
            amc: 0,
            government: 0,
            ownerRent: 0,
            maintenance: 0,
            other: 0,
        };
        const incomeByChannel = {
            cash_receipt: 0,
            pos: 0,
            benefit_pay: 0,
            untagged: 0,
        };
        for (const line of lines) {
            const { classification, amount } = (0, pnl_account_map_1.lineSignedPnlAmount)(line.accountCode, Number(line.debit), Number(line.credit));
            if (classification.kind === 'revenue') {
                const raw = line.incomeChannel?.trim();
                const tag = raw && income_channels_1.INCOME_CHANNELS.includes(raw)
                    ? raw
                    : 'untagged';
                incomeByChannel[tag] = (incomeByChannel[tag] ?? 0) + amount;
            }
            else if (classification.kind === 'expense' &&
                classification.expenseKey) {
                expenses[classification.expenseKey] += amount;
            }
        }
        const totalIncomeAll = Object.values(incomeByChannel).reduce((a, b) => a + b, 0);
        const totalExp = expenses.payroll +
            expenses.utilities +
            expenses.amc +
            expenses.government +
            expenses.ownerRent +
            expenses.maintenance +
            expenses.other;
        const activeFilter = channelFilter?.length ? channelFilter : undefined;
        let incomeIncluded = totalIncomeAll;
        if (activeFilter) {
            incomeIncluded = activeFilter.reduce((s, key) => s + (incomeByChannel[key] ?? 0), 0);
        }
        return {
            propertyId,
            month,
            year,
            statement: 'Income & expense',
            channelsAvailable: [...income_channels_1.INCOME_CHANNELS, 'untagged'],
            channelsFilter: activeFilter ?? null,
            incomeByChannel,
            totalIncomeRecognized: totalIncomeAll,
            totalIncomeInStatement: incomeIncluded,
            expenses,
            totalExpenses: totalExp,
            netIncome: incomeIncluded - totalExp,
            _note: 'Tag revenue journal lines with incomeChannel when posting. Untagged revenue appears under untagged.',
        };
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(journal_entry_entity_1.JournalEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(journal_line_entity_1.JournalLine)),
    __param(2, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map