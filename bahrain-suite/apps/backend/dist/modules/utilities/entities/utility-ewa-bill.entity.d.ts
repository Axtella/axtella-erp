import { AppBaseEntity } from '../../../common/base/base.entity';
import { UtilityEwaAccount } from './utility-ewa-account.entity';
export declare class UtilityEwaBill extends AppBaseEntity {
    ewaAccountId: string;
    ewaAccount?: UtilityEwaAccount;
    billPeriodFrom?: string | null;
    billPeriodTo?: string | null;
    billDate?: string | null;
    billNo?: string | null;
    capAmount?: string | null;
    capDate?: string | null;
    netAmount?: string | null;
    vatAmount?: string | null;
    totalBill?: string | null;
    paymentDueDate?: string | null;
    paidDate?: string | null;
    paidAmount: string;
    balanceDue?: string | null;
    notes?: string | null;
}
