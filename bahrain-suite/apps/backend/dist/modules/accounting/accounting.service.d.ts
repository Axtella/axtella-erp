import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { JournalLine } from './entities/journal-line.entity';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { FindJournalsDto } from './dto/find-journals.dto';
export declare class AccountingService {
    private readonly entryRepo;
    private readonly lineRepo;
    private readonly propertyRepo;
    constructor(entryRepo: Repository<JournalEntry>, lineRepo: Repository<JournalLine>, propertyRepo: Repository<Property>);
    private sumDebitCredit;
    private assertBalanced;
    private assertLineShape;
    private monthBounds;
    createJournal(dto: CreateJournalEntryDto): Promise<{
        lines: JournalLine[];
        journalNo: string;
        entryDate: string;
        propertyId?: string;
        narration?: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private generateJournalNo;
    findJournals(query: FindJournalsDto): Promise<{
        items: {
            lines: JournalLine[];
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
            lines: JournalLine[];
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
    findJournalById(id: string): Promise<{
        lines: JournalLine[];
        journalNo: string;
        entryDate: string;
        propertyId?: string;
        narration?: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
    private loadLinesForMonth;
    private buildPnlResult;
    buildMonthlyPnlXlsx(propertyId: string, month: number, year: number): Promise<Buffer>;
    trialBalance(from: string, to: string, propertyId?: string): Promise<{
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
    buildTrialBalanceXlsx(from: string, to: string, propertyId?: string): Promise<Buffer>;
    incomeExpenseStatement(propertyId: string, month: number, year: number, channelFilter?: string[]): Promise<{
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
}
