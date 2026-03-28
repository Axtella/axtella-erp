import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformPermission extends AppBaseEntity {
    code: string;
    name: string;
    moduleKey: string;
    description?: string;
}
