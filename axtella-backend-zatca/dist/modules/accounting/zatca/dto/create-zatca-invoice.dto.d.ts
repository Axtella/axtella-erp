declare class ZatcaInvoiceLineDto {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
}
export declare class CreateZatcaInvoiceDto {
    tenantId: string;
    invoiceType: 'standard' | 'simplified';
    invoiceNumber: string;
    issueDate: string;
    issueTime: string;
    sellerName: string;
    sellerVatNumber: string;
    buyerName?: string;
    buyerVatNumber?: string;
    lines: ZatcaInvoiceLineDto[];
}
export {};
