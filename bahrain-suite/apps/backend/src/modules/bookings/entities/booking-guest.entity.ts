import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'booking_guests' })
export class BookingGuest extends AppBaseEntity {
  @Column({ name: 'booking_id', type: 'uuid' })
  bookingId: string;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ name: 'cpr_no', length: 100, nullable: true })
  cprNo?: string;

  @Column({ name: 'passport_no', length: 100, nullable: true })
  passportNo?: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  nationality?: string;
}
