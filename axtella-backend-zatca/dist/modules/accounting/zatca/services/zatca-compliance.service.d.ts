export declare class ZatcaComplianceService {
    validateInvoice(xml: string): Promise<{
        status: string;
        xmlLength: number;
        notes: string[];
    }>;
}
