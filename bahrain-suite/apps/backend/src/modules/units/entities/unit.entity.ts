import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { UnitType } from '../../unit-types/entities/unit-type.entity';

@Entity({ name: 'units' })
@Index(['propertyId', 'unitNo'], { unique: true })
export class Unit extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @Column({ name: 'cost_center_id', type: 'uuid' })
  costCenterId: string;

  @Column({ name: 'unit_type_id', type: 'uuid' })
  unitTypeId: string;

  @ManyToOne(() => UnitType)
  @JoinColumn({ name: 'unit_type_id' })
  unitType?: UnitType;

  @Column({ name: 'unit_no', length: 50 })
  unitNo: string;

  @Column({ name: 'area_sq_m', type: 'numeric', precision: 12, scale: 2, nullable: true })
  areaSqM?: number;

  @Column({ name: 'bedroom_count', type: 'int', default: 0 })
  bedroomCount: number;

  @Column({ name: 'bathroom_count', type: 'int', default: 0 })
  bathroomCount: number;

  @Column({ name: 'max_occupancy', type: 'int', nullable: true })
  maxOccupancy?: number;

  @Column({ length: 30, default: 'vacant' })
  status: string;

  @Column({ name: 'default_daily_rate', type: 'numeric', precision: 12, scale: 2, default: 0 })
  defaultDailyRate: number;

  @Column({ name: 'default_monthly_rate', type: 'numeric', precision: 12, scale: 2, default: 0 })
  defaultMonthlyRate: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
