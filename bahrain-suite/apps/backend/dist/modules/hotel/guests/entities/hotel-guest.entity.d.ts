import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelGuest extends AppBaseEntity {
    customerId: string;
    guestNo: string;
    fullName: string;
    email?: string;
    phone?: string;
    nationality?: string;
    status: string;
}
