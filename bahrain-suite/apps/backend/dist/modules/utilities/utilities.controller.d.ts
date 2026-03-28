import { CreateEwaAccountDto } from './dto/create-ewa-account.dto';
import { CreateEwaBillDto } from './dto/create-ewa-bill.dto';
import { FindEwaAccountsDto } from './dto/find-ewa-accounts.dto';
import { FindEwaBillsDto } from './dto/find-ewa-bills.dto';
import { UtilitiesService } from './utilities.service';
export declare class UtilitiesController {
    private readonly service;
    constructor(service: UtilitiesService);
    overview(propertyId?: string): Promise<{
        module: string;
        propertyId: string;
        summary: {
            ewaAccountCount: number;
            ewaBillCount: number;
            totalBalanceDue: number;
        };
    }>;
    listEwaAccounts(query: FindEwaAccountsDto): Promise<{
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
    listEwaBills(query: FindEwaBillsDto): Promise<{
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
    createEwaBill(dto: CreateEwaBillDto): Promise<import("./entities/utility-ewa-bill.entity").UtilityEwaBill | {
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
}
