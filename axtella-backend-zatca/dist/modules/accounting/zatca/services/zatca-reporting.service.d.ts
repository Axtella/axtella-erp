export declare class ZatcaReportingService {
    reportSimplifiedInvoice(payload: any): Promise<{
        status: string;
        mode: string;
        invoiceType: any;
    }>;
    clearStandardInvoice(payload: any): Promise<{
        status: string;
        mode: string;
        invoiceType: any;
    }>;
}
