import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CatalogItemGroup extends AppBaseEntity {
    code: string;
    name: string;
    sortOrder: number;
    isActive: boolean;
    notes?: string;
}
