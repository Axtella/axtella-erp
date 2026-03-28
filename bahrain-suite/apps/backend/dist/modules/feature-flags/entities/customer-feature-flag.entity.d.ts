import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CustomerFeatureFlag extends AppBaseEntity {
    customerId: string;
    moduleFeatureId: string;
    isEnabled: boolean;
    configJson: Record<string, unknown>;
}
