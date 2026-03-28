import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformModuleCatalog extends AppBaseEntity {
    code: string;
    name: string;
    category: string;
    isDefault: boolean;
    isActive: boolean;
    sortOrder: number;
}
