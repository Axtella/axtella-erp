import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';
export declare class CostCenter extends AppBaseEntity {
    propertyId: string;
    code: string;
    name: string;
    costCenterType: string;
    isActive: boolean;
    property: Property;
}
