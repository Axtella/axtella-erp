export declare class CreateHotelReservationDto {
    customerId: string;
    propertyId: string;
    guestId: string;
    roomId?: string;
    reservationNo: string;
    arrivalDate: string;
    departureDate: string;
    adults?: number;
    children?: number;
    status?: string;
    notes?: string;
}
