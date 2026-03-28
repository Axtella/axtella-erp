import { AppBaseEntity } from '../../../common/base/base.entity';
import { CostCenter } from '../../cost-centers/entities/cost-center.entity';
import { Property } from '../../properties/entities/property.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Unit } from '../../units/entities/unit.entity';
export declare class Booking extends AppBaseEntity {
    propertyId: string;
    property?: Property;
    costCenterId: string;
    costCenter?: CostCenter;
    unitId: string;
    unit?: Unit;
    tenantId: string;
    tenant?: Tenant;
    bookingType: string;
    bookingSource?: string;
    checkInDate: Date;
    checkOutDate?: Date;
    contractStartDate?: string;
    contractEndDate?: string;
    status: string;
    rateDaily: number;
    rateMonthly: number;
    depositAmount: number;
    discountAmount: number;
    notes?: string;
}
