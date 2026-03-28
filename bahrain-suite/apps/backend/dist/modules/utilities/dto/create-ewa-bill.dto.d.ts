export declare class CreateEwaBillDto {
    ewaAccountId: string;
    billPeriodFrom?: string;
    billPeriodTo?: string;
    billDate: string;
    billNo?: string;
    capAmount?: number | string;
    capDate?: string;
    netAmount?: number | string;
    vatAmount?: number | string;
    totalBill: number;
    paymentDueDate?: string;
    paidDate?: string;
    paidAmount?: number | string;
    notes?: string;
}
