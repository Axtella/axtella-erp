import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_housekeeping_tasks' })
export class HotelHousekeepingTask extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'room_id', type: 'uuid' })
  roomId: string;

  @Column({ name: 'task_type', length: 30, default: 'cleaning' })
  taskType: string;

  @Column({ length: 30, default: 'open' })
  status: string;

  @Column({ name: 'assigned_to', length: 120, nullable: true })
  assignedTo?: string;

  @Column({ name: 'scheduled_for', type: 'date', nullable: true })
  scheduledFor?: string;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
