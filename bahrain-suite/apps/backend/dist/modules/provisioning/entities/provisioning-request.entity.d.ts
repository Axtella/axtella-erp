import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class ProvisioningRequest extends AppBaseEntity {
    customerId: string;
    requestedBy?: string;
    requestType: string;
    status: string;
    requestedConfigJson: Record<string, unknown>;
    resultJson: Record<string, unknown>;
}
