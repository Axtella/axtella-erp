import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class Property extends AppBaseEntity {
    code: string;
    name: string;
    propertyType: string;
    address?: string;
    city: string;
    investorId?: string;
    ownerRentMonthly: number;
    operationStartDate?: string;
    status: string;
    notes?: string;
    accentColor?: string | null;
}
