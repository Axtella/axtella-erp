import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelReservation extends AppBaseEntity {
    customerId: string;
    propertyId: string;
    guestId: string;
    roomId?: string;
    reservationNo: string;
    arrivalDate: string;
    departureDate: string;
    adults: number;
    children: number;
    status: string;
    notes?: string;
}
