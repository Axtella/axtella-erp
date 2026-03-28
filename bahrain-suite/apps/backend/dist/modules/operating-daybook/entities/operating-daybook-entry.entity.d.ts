import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';
import { Unit } from '../../units/entities/unit.entity';
export declare class OperatingDaybookEntry extends AppBaseEntity {
    propertyId: string;
    property?: Property;
    unitId?: string | null;
    unit?: Unit | null;
    entryDate: string;
    voucherNo?: string | null;
    accountCategory: string;
    description?: string | null;
    reference?: string | null;
    paymentChannel?: string | null;
    bankAccountHint?: string | null;
    debit: string;
    credit: string;
    approved: boolean;
    approvedBy?: string | null;
    approvalDate?: string | null;
    remarks?: string | null;
}
