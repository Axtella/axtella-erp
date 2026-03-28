export declare class CreateBookingDto {
    propertyId: string;
    costCenterId: string;
    unitId: string;
    tenantId: string;
    bookingType: string;
    bookingSource?: string;
    checkInDate: string;
    checkOutDate?: string;
    contractStartDate?: string;
    contractEndDate?: string;
    status?: string;
    rateDaily?: number;
    rateMonthly?: number;
    depositAmount?: number;
    discountAmount?: number;
    notes?: string;
}
