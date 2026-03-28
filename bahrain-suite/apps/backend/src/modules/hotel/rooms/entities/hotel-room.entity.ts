import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_rooms' })
export class HotelRoom extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'room_type_id', type: 'uuid' })
  roomTypeId: string;

  @Column({ name: 'room_no', length: 50 })
  roomNo: string;

  @Column({ name: 'floor_label', length: 30, nullable: true })
  floorLabel?: string;

  @Column({ length: 30, default: 'vacant' })
  status: string;
}
