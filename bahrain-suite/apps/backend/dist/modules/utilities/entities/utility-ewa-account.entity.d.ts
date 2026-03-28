import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';
import { Unit } from '../../units/entities/unit.entity';
import { UtilityEwaBill } from './utility-ewa-bill.entity';
export declare class UtilityEwaAccount extends AppBaseEntity {
    propertyId: string;
    property?: Property;
    unitId?: string | null;
    unit?: Unit | null;
    unitLabel?: string | null;
    ewaAccountNo: string;
    notes?: string | null;
    bills?: UtilityEwaBill[];
}
