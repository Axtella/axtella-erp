import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { OperatingDaybookEntry } from './entities/operating-daybook-entry.entity';
import { CreateOperatingDaybookEntryDto } from './dto/create-operating-daybook-entry.dto';
import { FindOperatingDaybookDto } from './dto/find-operating-daybook.dto';
export declare class OperatingDaybookService {
    private readonly repo;
    private readonly propRepo;
    constructor(repo: Repository<OperatingDaybookEntry>, propRepo: Repository<Property>);
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
    create(dto: CreateOperatingDaybookEntryDto): Promise<OperatingDaybookEntry | {
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
