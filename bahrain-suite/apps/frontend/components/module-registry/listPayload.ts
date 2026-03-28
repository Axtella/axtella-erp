export type ListPayload = {
  items: Record<string, unknown>[];
  total: number;
  page?: number;
  limit?: number;
};

export function extractListPayload(data: unknown): ListPayload | null {
  if (!data || typeof data !== 'object') return null;
  const o = data as Record<string, unknown>;
  if (!Array.isArray(o.items)) return null;
  const items = o.items as Record<string, unknown>[];
  const total = typeof o.total === 'number' ? o.total : items.length;
  const page = typeof o.page === 'number' ? o.page : undefined;
  const limit = typeof o.limit === 'number' ? o.limit : undefined;
  return { items, total, page, limit };
}

export function endpointPath(endpoint: string): string {
  const q = endpoint.indexOf('?');
  return q === -1 ? endpoint : endpoint.slice(0, q);
}

export function isStubModulePayload(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return typeof o.module === 'string' && Array.isArray(o.items);
}

export function isMonthlyPnlPayload(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  return (
    o.revenue !== null &&
    typeof o.revenue === 'object' &&
    o.expenses !== null &&
    typeof o.expenses === 'object' &&
    typeof o.netProfitLoss === 'number'
  );
}

export function isJournalListPayload(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  if (!Array.isArray(o.items)) return false;
  if (o.items.length === 0) return true;
  const first = o.items[0];
  return (
    first !== null &&
    typeof first === 'object' &&
    typeof (first as Record<string, unknown>).journalNo === 'string'
  );
}
