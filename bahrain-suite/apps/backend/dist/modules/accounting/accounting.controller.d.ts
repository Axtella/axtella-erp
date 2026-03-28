import { StreamableFile } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { CoaAccountHeadsService } from './coa-account-heads.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { CreateCoaAccountHeadDto } from './dto/create-coa-account-head.dto';
import { UpdateCoaAccountHeadDto } from './dto/update-coa-account-head.dto';
import { FindCoaAccountHeadsDto } from './dto/find-coa-account-heads.dto';
import { FindJournalsDto } from './dto/find-journals.dto';
import { FindTrialBalanceDto } from './dto/find-trial-balance.dto';
export declare class AccountingController {
    private readonly service;
    private readonly coaHeads;
    constructor(service: AccountingService, coaHeads: CoaAccountHeadsService);
    listCoaAccountHeads(query: FindCoaAccountHeadsDto): Promise<{
        items: import("./entities/coa-account-head.entity").CoaAccountHead[];
        total: number;
        page: number;
        limit: number;
    }>;
    createCoaAccountHead(dto: CreateCoaAccountHeadDto): Promise<import("./entities/coa-account-head.entity").CoaAccountHead>;
    updateCoaAccountHead(id: string, dto: UpdateCoaAccountHeadDto): Promise<import("./entities/coa-account-head.entity").CoaAccountHead>;
    removeCoaAccountHead(id: string): Promise<{
        deleted: boolean;
    }>;
    trialBalance(q: FindTrialBalanceDto): Promise<{
        from: string;
        to: string;
        propertyId: string;
        rows: {
            accountCode: string;
            totalDebit: number;
            totalCredit: number;
            netDebit: number;
            netCredit: number;
        }[];
        totalDebit: number;
        totalCredit: number;
        difference: number;
    }>;
    trialBalanceExport(q: FindTrialBalanceDto): Promise<StreamableFile>;
    journals(query: FindJournalsDto): Promise<{
        items: {
            lines: import("./entities/journal-line.entity").JournalLine[];
            journalNo: string;
            entryDate: string;
            propertyId?: string;
            narration?: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    daybook(query: FindJournalsDto): Promise<{
        items: {
            lines: import("./entities/journal-line.entity").JournalLine[];
            journalNo: string;
            entryDate: string;
            propertyId?: string;
            narration?: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    journalById(id: string): Promise<{
        lines: import("./entities/journal-line.entity").JournalLine[];
        journalNo: string;
        entryDate: string;
        propertyId?: string;
        narration?: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createJournal(dto: CreateJournalEntryDto): Promise<{
        lines: import("./entities/journal-line.entity").JournalLine[];
        journalNo: string;
        entryDate: string;
        propertyId?: string;
        narration?: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    incomeExpense(propertyId: string, month: number, year: number, channelsRaw?: string): Promise<{
        propertyId: string;
        month: number;
        year: number;
        statement: string;
        channelsAvailable: string[];
        channelsFilter: string[];
        incomeByChannel: Record<string, number>;
        totalIncomeRecognized: number;
        totalIncomeInStatement: number;
        expenses: {
            payroll: number;
            utilities: number;
            amc: number;
            government: number;
            ownerRent: number;
            maintenance: number;
            other: number;
        };
        totalExpenses: number;
        netIncome: number;
        _note: string;
    }>;
    monthlyPnl(propertyId: string, month: number, year: number): Promise<{
        propertyId: string;
        month: number;
        year: number;
        revenue: {
            residential: number;
            commercial: number;
            other: number;
        };
        expenses: {
            payroll: number;
            utilities: number;
            amc: number;
            government: number;
            ownerRent: number;
            maintenance: number;
            other: number;
        };
        netProfitLoss: number;
        _basis: string;
    }>;
    exportMonthlyPnl(propertyId: string, month: number, year: number): Promise<StreamableFile>;
}
