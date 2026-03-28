export type PnlRevenueKey = 'residential' | 'commercial' | 'other';
export type PnlExpenseKey = 'payroll' | 'utilities' | 'amc' | 'government' | 'ownerRent' | 'maintenance' | 'other';
export type PnlKind = 'revenue' | 'expense';
export interface AccountClassification {
    kind: PnlKind;
    revenueKey?: PnlRevenueKey;
    expenseKey?: PnlExpenseKey;
}
export declare function classifyAccount(accountCode: string): AccountClassification;
export declare function lineSignedPnlAmount(accountCode: string, debit: number, credit: number): {
    classification: AccountClassification;
    amount: number;
};
