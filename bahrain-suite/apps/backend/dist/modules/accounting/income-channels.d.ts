export declare const INCOME_CHANNELS: readonly ["cash_receipt", "pos", "benefit_pay"];
export type IncomeChannelId = (typeof INCOME_CHANNELS)[number];
export declare const INCOME_CHANNEL_SET: Set<string>;
export declare function parseIncomeChannelList(raw?: string): string[] | undefined;
