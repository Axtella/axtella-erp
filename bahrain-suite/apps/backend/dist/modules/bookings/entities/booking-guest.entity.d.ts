import { AppBaseEntity } from '../../../common/base/base.entity';
export declare class BookingGuest extends AppBaseEntity {
    bookingId: string;
    fullName: string;
    cprNo?: string;
    passportNo?: string;
    phone?: string;
    nationality?: string;
}
