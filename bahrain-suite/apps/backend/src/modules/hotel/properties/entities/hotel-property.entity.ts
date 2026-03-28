import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_properties' })
export class HotelProperty extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 120, nullable: true })
  city?: string;

  @Column({ name: 'country_code', length: 10, default: 'BH' })
  countryCode: string;

  @Column({ length: 100, default: 'Asia/Bahrain' })
  timezone: string;

  @Column({ length: 30, default: 'active' })
  status: string;
}
