import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_room_types' })
export class HotelRoomType extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ length: 50 })
  code: string;

  @Column({ name: 'name_i18n', type: 'jsonb', default: () => "'{}'::jsonb" })
  nameI18n: Record<string, string>;

  @Column({ length: 50, nullable: true })
  category?: string;

  @Column({ name: 'max_occupancy', type: 'int', default: 1 })
  maxOccupancy: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
