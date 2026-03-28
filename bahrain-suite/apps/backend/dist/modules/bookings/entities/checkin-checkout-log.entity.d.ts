import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class CheckinCheckoutLog extends AppBaseEntity {
    bookingId: string;
    propertyId: string;
    unitId: string;
    logType: string;
    eventTime: Date;
    remarks?: string;
}
