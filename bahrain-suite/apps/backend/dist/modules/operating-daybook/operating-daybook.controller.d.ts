import { CreateOperatingDaybookEntryDto } from './dto/create-operating-daybook-entry.dto';
import { FindOperatingDaybookDto } from './dto/find-operating-daybook.dto';
import { OperatingDaybookService } from './operating-daybook.service';
export declare class OperatingDaybookController {
    private readonly service;
    constructor(service: OperatingDaybookService);
    findAll(query: FindOperatingDaybookDto): Promise<{
        items: {
            id: string;
            propertyId: string;
            propertyName: string;
            propertyCode: string;
            unitId: string;
            entryDate: string;
            voucherNo: string;
            accountCategory: string;
            description: string;
            reference: string;
            paymentChannel: string;
            bankAccountHint: string;
            debit: number;
            credit: number;
            approved: boolean;
            approvedBy: string;
            approvalDate: string;
            remarks: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateOperatingDaybookEntryDto): Promise<import("./entities/operating-daybook-entry.entity").OperatingDaybookEntry | {
        id: string;
        propertyId: string;
        propertyName: string;
        propertyCode: string;
        unitId: string;
        entryDate: string;
        voucherNo: string;
        accountCategory: string;
        description: string;
        reference: string;
        paymentChannel: string;
        bankAccountHint: string;
        debit: number;
        credit: number;
        approved: boolean;
        approvedBy: string;
        approvalDate: string;
        remarks: string;
    }>;
}
