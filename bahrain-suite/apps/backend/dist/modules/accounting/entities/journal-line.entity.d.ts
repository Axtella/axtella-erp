import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class JournalLine extends AppBaseEntity {
    journalEntryId: string;
    accountCode: string;
    debit: number;
    credit: number;
    incomeChannel?: string;
}
