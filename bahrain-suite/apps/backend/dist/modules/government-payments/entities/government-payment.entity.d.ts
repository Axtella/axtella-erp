import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class GovernmentPayment extends AppBaseEntity {
    propertyId?: string;
    paymentType: string;
    amount: number;
    status: string;
}
