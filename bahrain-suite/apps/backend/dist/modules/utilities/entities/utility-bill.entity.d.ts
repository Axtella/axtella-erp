import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class UtilityBill extends AppBaseEntity {
    propertyId: string;
    utilityType: string;
    billingPeriodStart: string;
    billingPeriodEnd: string;
    amount: number;
    status: string;
}
