import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';

@Entity({ name: 'checkin_checkout_logs' })
export class CheckinCheckoutLog extends AppBaseEntity {
  @Column({ name: 'booking_id', type: 'uuid' })
  bookingId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'unit_id', type: 'uuid' })
  unitId: string;

  @Column({ name: 'log_type', length: 30 })
  logType: string;

  @Column({ name: 'event_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  eventTime: Date;

  @Column({ type: 'text', nullable: true })
  remarks?: string;
}
