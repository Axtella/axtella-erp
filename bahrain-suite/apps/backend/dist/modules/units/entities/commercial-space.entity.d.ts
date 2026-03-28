import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CommercialSpace extends AppBaseEntity {
    propertyId: string;
    costCenterId: string;
    unitId?: string;
    spaceType: string;
    tenantName?: string;
    monthlyRent: number;
    status: string;
}
