import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformRoleTemplate extends AppBaseEntity {
    code: string;
    name: string;
    template: Record<string, unknown>;
    isActive: boolean;
}
