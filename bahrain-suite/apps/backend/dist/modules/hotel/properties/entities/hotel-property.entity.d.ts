import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelProperty extends AppBaseEntity {
    customerId: string;
    code: string;
    name: string;
    city?: string;
    countryCode: string;
    timezone: string;
    status: string;
}
