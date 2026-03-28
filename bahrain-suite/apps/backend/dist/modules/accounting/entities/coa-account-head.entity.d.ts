import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CoaAccountHead extends AppBaseEntity {
    accountCode: string;
    name: string;
    accountType: string;
    notes?: string | null;
    isActive: boolean;
}
