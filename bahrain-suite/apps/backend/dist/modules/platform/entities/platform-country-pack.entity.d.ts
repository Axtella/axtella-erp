import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class PlatformCountryPack extends AppBaseEntity {
    code: string;
    name: string;
    settings: Record<string, unknown>;
    isActive: boolean;
}
