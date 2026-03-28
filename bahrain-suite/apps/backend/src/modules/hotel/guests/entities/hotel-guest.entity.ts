import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_guests' })
export class HotelGuest extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'guest_no', length: 100 })
  guestNo: string;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ length: 200, nullable: true })
  email?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 80, nullable: true })
  nationality?: string;

  @Column({ length: 30, default: 'active' })
  status: string;
}
