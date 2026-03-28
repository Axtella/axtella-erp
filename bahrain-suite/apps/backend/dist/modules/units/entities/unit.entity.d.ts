import { AppBaseEntity } from '../../../common/base/base.entity';
import { UnitType } from '../../unit-types/entities/unit-type.entity';
export declare class Unit extends AppBaseEntity {
    propertyId: string;
    costCenterId: string;
    unitTypeId: string;
    unitType?: UnitType;
    unitNo: string;
    areaSqM?: number;
    bedroomCount: number;
    bathroomCount: number;
    maxOccupancy?: number;
    status: string;
    defaultDailyRate: number;
    defaultMonthlyRate: number;
    notes?: string;
}
