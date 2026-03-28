import { AppBaseEntity } from '../../../common/base/base.entity';
import { CatalogItemGroup } from '../../catalog-item-groups/entities/catalog-item-group.entity';
export declare class CatalogItem extends AppBaseEntity {
    code: string;
    name: string;
    itemType: string;
    unitOfMeasure: string;
    defaultPrice: number;
    isActive: boolean;
    notes?: string;
    groupId?: string | null;
    group?: CatalogItemGroup | null;
}
