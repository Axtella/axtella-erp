import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { Unit } from '../units/entities/unit.entity';
import { UtilityEwaAccount } from './entities/utility-ewa-account.entity';
import { UtilityEwaBill } from './entities/utility-ewa-bill.entity';
import { CreateEwaAccountDto } from './dto/create-ewa-account.dto';
import { CreateEwaBillDto } from './dto/create-ewa-bill.dto';
import { FindEwaAccountsDto } from './dto/find-ewa-accounts.dto';
import { FindEwaBillsDto } from './dto/find-ewa-bills.dto';
export declare class UtilitiesService {
    private readonly acctRepo;
    private readonly billRepo;
    private readonly propRepo;
    private readonly unitRepo;
    constructor(acctRepo: Repository<UtilityEwaAccount>, billRepo: Repository<UtilityEwaBill>, propRepo: Repository<Property>, unitRepo: Repository<Unit>);
    overview(propertyId?: string): Promise<{
        module: string;
        propertyId: string;
        summary: {
            ewaAccountCount: number;
            ewaBillCount: number;
            totalBalanceDue: number;
        };
    }>;
    findEwaAccounts(query: FindEwaAccountsDto): Promise<{
        items: {
            id: string;
            propertyId: string;
            propertyName: string;
            propertyCode: string;
            unitId: string;
            unitNo: string;
            unitLabel: string;
            ewaAccountNo: string;
            notes: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    createEwaAccount(dto: CreateEwaAccountDto): Promise<{
        id: string;
        propertyId: string;
        propertyName: string;
        propertyCode: string;
        unitId: string;
        unitNo: string;
        unitLabel: string;
        ewaAccountNo: string;
        notes: string;
    }>;
    findEwaBills(query: FindEwaBillsDto): Promise<{
        items: {
            id: string;
            ewaAccountId: string;
            propertyId: string;
            propertyName: string;
            propertyCode: string;
            unitNo: string;
            unitLabel: string;
            ewaAccountNo: string;
            billPeriodFrom: string;
            billPeriodTo: string;
            billDate: string;
            billNo: string;
            capAmount: number;
            capDate: string;
            netAmount: number;
            vatAmount: number;
            totalBill: number;
            paymentDueDate: string;
            paidDate: string;
            paidAmount: number;
            balanceDue: number;
            notes: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    createEwaBill(dto: CreateEwaBillDto): Promise<UtilityEwaBill | {
        id: string;
        ewaAccountId: string;
        propertyId: string;
        propertyName: string;
        propertyCode: string;
        unitNo: string;
        unitLabel: string;
        ewaAccountNo: string;
        billPeriodFrom: string;
        billPeriodTo: string;
        billDate: string;
        billNo: string;
        capAmount: number;
        capDate: string;
        netAmount: number;
        vatAmount: number;
        totalBill: number;
        paymentDueDate: string;
        paidDate: string;
        paidAmount: number;
        balanceDue: number;
        notes: string;
    }>;
    private mapAccountRow;
    private mapBill;
}
