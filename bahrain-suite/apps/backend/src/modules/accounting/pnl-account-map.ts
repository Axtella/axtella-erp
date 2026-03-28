/**
 * Maps `account_code` prefixes to P&L buckets (server-side parity with typical Excel COA columns).
 * Extend this table as your chart of accounts grows.
 */
export type PnlRevenueKey = 'residential' | 'commercial' | 'other';
export type PnlExpenseKey =
  | 'payroll'
  | 'utilities'
  | 'amc'
  | 'government'
  | 'ownerRent'
  | 'maintenance'
  | 'other';

export type PnlKind = 'revenue' | 'expense';

export interface AccountClassification {
  kind: PnlKind;
  revenueKey?: PnlRevenueKey;
  expenseKey?: PnlExpenseKey;
}

const norm = (code: string) => code.replace(/\s/g, '').toUpperCase();

/** First 2–4 digits determine bucket; unknown revenue → other, unknown expense → other */
export function classifyAccount(accountCode: string): AccountClassification {
  const c = norm(accountCode);
  const head2 = c.slice(0, 2);
  const head3 = c.slice(0, 3);

  if (head2 === '40' || head3 === '400') {
    return { kind: 'revenue', revenueKey: 'residential' };
  }
  if (head2 === '41' || head3 === '410') {
    return { kind: 'revenue', revenueKey: 'commercial' };
  }
  if (head2 === '42' || head2 === '43' || head2 === '44') {
    return { kind: 'revenue', revenueKey: 'other' };
  }
  if (head2 === '4') {
    return { kind: 'revenue', revenueKey: 'other' };
  }

  if (head2 === '60' || head3 === '600') {
    return { kind: 'expense', expenseKey: 'payroll' };
  }
  if (head2 === '61' || head3 === '610') {
    return { kind: 'expense', expenseKey: 'utilities' };
  }
  if (head2 === '62' || head3 === '620') {
    return { kind: 'expense', expenseKey: 'amc' };
  }
  if (head2 === '63' || head3 === '630') {
    return { kind: 'expense', expenseKey: 'government' };
  }
  if (head2 === '64' || head3 === '640') {
    return { kind: 'expense', expenseKey: 'ownerRent' };
  }
  if (head2 === '65' || head3 === '650') {
    return { kind: 'expense', expenseKey: 'maintenance' };
  }
  if (/^[6-8]/.test(c)) {
    return { kind: 'expense', expenseKey: 'other' };
  }

  return { kind: 'expense', expenseKey: 'other' };
}

/** Signed contribution toward P&L (positive adds to profit for revenue, positive adds cost for expense). */
export function lineSignedPnlAmount(
  accountCode: string,
  debit: number,
  credit: number,
): { classification: AccountClassification; amount: number } {
  const classification = classifyAccount(accountCode);
  const d = Number(debit) || 0;
  const cr = Number(credit) || 0;
  if (classification.kind === 'revenue') {
    return { classification, amount: cr - d };
  }
  return { classification, amount: d - cr };
}
