import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CustomerEnvironment extends AppBaseEntity {
    customerId: string;
    environmentKey: string;
    environmentType: string;
    appUrl?: string;
    apiUrl?: string;
    deploymentStatus: string;
}
