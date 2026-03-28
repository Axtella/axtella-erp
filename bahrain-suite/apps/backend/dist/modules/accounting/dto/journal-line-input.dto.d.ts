import { INCOME_CHANNELS } from '../income-channels';
export declare class JournalLineInputDto {
    accountCode: string;
    debit: number;
    credit: number;
    incomeChannel?: (typeof INCOME_CHANNELS)[number];
}
