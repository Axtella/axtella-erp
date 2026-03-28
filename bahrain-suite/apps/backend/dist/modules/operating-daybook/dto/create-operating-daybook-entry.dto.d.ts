export declare class CreateOperatingDaybookEntryDto {
    propertyId: string;
    unitId?: string;
    entryDate: string;
    voucherNo?: string;
    accountCategory: string;
    description?: string;
    reference?: string;
    paymentChannel?: string;
    bankAccountHint?: string;
    debit?: number | string;
    credit?: number | string;
    approved?: boolean;
    approvedBy?: string;
    approvalDate?: string;
    remarks?: string;
}
