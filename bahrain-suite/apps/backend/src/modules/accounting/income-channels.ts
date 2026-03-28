/** How rental / service income was received (for income & expense reporting). */
export const INCOME_CHANNELS = [
  'cash_receipt',
  'pos',
  'benefit_pay',
] as const;

export type IncomeChannelId = (typeof INCOME_CHANNELS)[number];

export const INCOME_CHANNEL_SET = new Set<string>(INCOME_CHANNELS);

export function parseIncomeChannelList(raw?: string): string[] | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const parts = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (p === 'untagged') out.push('untagged');
    else if (INCOME_CHANNEL_SET.has(p)) out.push(p);
  }
  return out.length ? out : undefined;
}
