import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { PRODUCT_COMPANY_NAME } from '../../common/product-branding';
import { Property } from '../properties/entities/property.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { JournalLine } from './entities/journal-line.entity';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { FindJournalsDto } from './dto/find-journals.dto';
import { lineSignedPnlAmount } from './pnl-account-map';
import { INCOME_CHANNELS } from './income-channels';

const BALANCE_EPS = 0.01;

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly entryRepo: Repository<JournalEntry>,
    @InjectRepository(JournalLine)
    private readonly lineRepo: Repository<JournalLine>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  private sumDebitCredit(lines: { debit: number; credit: number }[]) {
    const td = lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
    const tc = lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
    return { totalDebit: td, totalCredit: tc };
  }

  private assertBalanced(lines: { debit: number; credit: number }[]) {
    const { totalDebit, totalCredit } = this.sumDebitCredit(lines);
    if (Math.abs(totalDebit - totalCredit) > BALANCE_EPS) {
      throw new BadRequestException(
        `Journal must balance: total debit ${totalDebit} vs credit ${totalCredit}`,
      );
    }
  }

  private assertLineShape(lines: CreateJournalEntryDto['lines']) {
    for (const l of lines) {
      const d = Number(l.debit) || 0;
      const c = Number(l.credit) || 0;
      if (d < 0 || c < 0) {
        throw new BadRequestException('Debit and credit must be non-negative');
      }
      if (d > 0 && c > 0) {
        throw new BadRequestException(
          'Each line must post to either debit or credit, not both',
        );
      }
      if (d === 0 && c === 0) {
        throw new BadRequestException('Each line must have a non-zero amount');
      }
    }
  }

  private monthBounds(month: number, year: number) {
    const from = `${year}-${String(month).padStart(2, '0')}-01`;
    const last = new Date(year, month, 0).getDate();
    const to = `${year}-${String(month).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
    return { from, to };
  }

  async createJournal(dto: CreateJournalEntryDto) {
    if (!dto.lines?.length) {
      throw new BadRequestException('At least one journal line is required');
    }
    this.assertLineShape(dto.lines);
    this.assertBalanced(dto.lines);

    if (dto.propertyId) {
      const prop = await this.propertyRepo.findOne({
        where: { id: dto.propertyId },
      });
      if (!prop) {
        throw new BadRequestException('Property not found');
      }
    }

    const journalNo = await this.generateJournalNo(dto.propertyId);

    return this.entryRepo.manager.transaction(async (em) => {
      const entry = em.create(JournalEntry, {
        journalNo,
        entryDate: dto.entryDate,
        propertyId: dto.propertyId,
        narration: dto.narration,
      });
      await em.save(entry);
      for (const line of dto.lines) {
        await em.save(
          em.create(JournalLine, {
            journalEntryId: entry.id,
            accountCode: line.accountCode.trim(),
            debit: line.debit,
            credit: line.credit,
            incomeChannel: line.incomeChannel,
          }),
        );
      }
      return this.findJournalById(entry.id);
    });
  }

  private async generateJournalNo(propertyId?: string): Promise<string> {
    const prefix = propertyId
      ? `P-${propertyId.slice(0, 8).toUpperCase()}`
      : 'CO';
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `${prefix}-${stamp}-${rnd}`;
  }

  async findJournals(query: FindJournalsDto) {
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
    const withLines = await Promise.all(
      items.map(async (e) => ({
        ...e,
        lines: await this.lineRepo.find({
          where: { journalEntryId: e.id },
          order: { createdAt: 'ASC' },
        }),
      })),
    );
    return { items: withLines, total: withLines.length };
  }

  /** Daybook: same as journals with optional date filters (chronological for UI). */
  async daybook(query: FindJournalsDto) {
    const res = await this.findJournals(query);
    const items = [...res.items].sort((a, b) => {
      const da = String(a.entryDate).localeCompare(String(b.entryDate));
      if (da !== 0) return da;
      return String(a.createdAt).localeCompare(String(b.createdAt));
    });
    return { items, total: items.length };
  }

  async findJournalById(id: string) {
    const entry = await this.entryRepo.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException('Journal entry not found');
    }
    const lines = await this.lineRepo.find({
      where: { journalEntryId: id },
      order: { createdAt: 'ASC' },
    });
    return { ...entry, lines };
  }

  async monthlyPnl(propertyId: string, month: number, year: number) {
    return this.buildPnlResult(propertyId, month, year);
  }

  private async loadLinesForMonth(
    propertyId: string | undefined,
    month: number,
    year: number,
  ) {
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
      where: { journalEntryId: In(ids) },
    });
  }

  private async buildPnlResult(
    propertyId: string,
    month: number,
    year: number,
  ) {
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
      const { classification, amount } = lineSignedPnlAmount(
        line.accountCode,
        Number(line.debit),
        Number(line.credit),
      );
      if (classification.kind === 'revenue' && classification.revenueKey) {
        revenue[classification.revenueKey] += amount;
      } else if (
        classification.kind === 'expense' &&
        classification.expenseKey
      ) {
        expenses[classification.expenseKey] += amount;
      }
    }

    const totalRev =
      revenue.residential + revenue.commercial + revenue.other;
    const totalExp =
      expenses.payroll +
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
      _basis:
        'Posted journal lines; COA mapping in pnl-account-map.ts (Excel-style buckets).',
    };
  }

  async buildMonthlyPnlXlsx(
    propertyId: string,
    month: number,
    year: number,
  ): Promise<Buffer> {
    const pnl = await this.buildPnlResult(propertyId, month, year);
    const { from, to } = this.monthBounds(month, year);
    const daybook = await this.findJournals({ propertyId, from, to });

    const wb = new ExcelJS.Workbook();
    wb.creator = PRODUCT_COMPANY_NAME;
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

  async trialBalance(from: string, to: string, propertyId?: string) {
    const qb = this.lineRepo
      .createQueryBuilder('jl')
      .innerJoin(JournalEntry, 'je', 'je.id = jl.journalEntryId')
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
        accountCode: r.accountCode as string,
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

  async buildTrialBalanceXlsx(
    from: string,
    to: string,
    propertyId?: string,
  ): Promise<Buffer> {
    const tb = await this.trialBalance(from, to, propertyId);
    const wb = new ExcelJS.Workbook();
    wb.creator = PRODUCT_COMPANY_NAME;
    wb.created = new Date();
    const ws = wb.addWorksheet('Trial_Balance', {
      views: [{ state: 'frozen', ySplit: 3 }],
    });
    ws.mergeCells('A1:E1');
    ws.getCell('A1').value = PRODUCT_COMPANY_NAME;
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

  /**
   * Income & expense statement: expenses always full period; income optionally filtered
   * by `income_channel` on revenue lines (cash_receipt, pos, benefit_pay, untagged).
   */
  async incomeExpenseStatement(
    propertyId: string,
    month: number,
    year: number,
    channelFilter?: string[],
  ) {
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
    const incomeByChannel: Record<string, number> = {
      cash_receipt: 0,
      pos: 0,
      benefit_pay: 0,
      untagged: 0,
    };

    for (const line of lines) {
      const { classification, amount } = lineSignedPnlAmount(
        line.accountCode,
        Number(line.debit),
        Number(line.credit),
      );
      if (classification.kind === 'revenue') {
        const raw = line.incomeChannel?.trim();
        const tag =
          raw && INCOME_CHANNELS.includes(raw as (typeof INCOME_CHANNELS)[number])
            ? raw
            : 'untagged';
        incomeByChannel[tag] = (incomeByChannel[tag] ?? 0) + amount;
      } else if (
        classification.kind === 'expense' &&
        classification.expenseKey
      ) {
        expenses[classification.expenseKey] += amount;
      }
    }

    const totalIncomeAll = Object.values(incomeByChannel).reduce((a, b) => a + b, 0);
    const totalExp =
      expenses.payroll +
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
      channelsAvailable: [...INCOME_CHANNELS, 'untagged'],
      channelsFilter: activeFilter ?? null,
      incomeByChannel,
      totalIncomeRecognized: totalIncomeAll,
      totalIncomeInStatement: incomeIncluded,
      expenses,
      totalExpenses: totalExp,
      netIncome: incomeIncluded - totalExp,
      _note:
        'Tag revenue journal lines with incomeChannel when posting. Untagged revenue appears under untagged.',
    };
  }
}
