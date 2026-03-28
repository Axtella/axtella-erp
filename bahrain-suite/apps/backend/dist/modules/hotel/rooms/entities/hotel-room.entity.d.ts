import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelRoom extends AppBaseEntity {
    customerId: string;
    propertyId: string;
    roomTypeId: string;
    roomNo: string;
    floorLabel?: string;
    status: string;
}
