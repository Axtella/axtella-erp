import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../common/base/base.entity';

@Entity({ name: 'hotel_reservations' })
export class HotelReservation extends AppBaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'guest_id', type: 'uuid' })
  guestId: string;

  @Column({ name: 'room_id', type: 'uuid', nullable: true })
  roomId?: string;

  @Column({ name: 'reservation_no', length: 100 })
  reservationNo: string;

  @Column({ name: 'arrival_date', type: 'date' })
  arrivalDate: string;

  @Column({ name: 'departure_date', type: 'date' })
  departureDate: string;

  @Column({ type: 'int', default: 1 })
  adults: number;

  @Column({ type: 'int', default: 0 })
  children: number;

  @Column({ length: 30, default: 'reserved' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
