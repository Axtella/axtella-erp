export declare const COA_ACCOUNT_TYPES: readonly ["asset", "liability", "equity", "revenue", "expense"];
export type CoaAccountType = (typeof COA_ACCOUNT_TYPES)[number];
export declare class CreateCoaAccountHeadDto {
    accountCode: string;
    name: string;
    accountType: CoaAccountType;
    notes?: string;
    isActive?: boolean;
}
