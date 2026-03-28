import { AppBaseEntity } from '../../../../common/base/base.entity';
export declare class HotelRoomType extends AppBaseEntity {
    customerId: string;
    propertyId: string;
    code: string;
    nameI18n: Record<string, string>;
    category?: string;
    maxOccupancy: number;
    isActive: boolean;
}
