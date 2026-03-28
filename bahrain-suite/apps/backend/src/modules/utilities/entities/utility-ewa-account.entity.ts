import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../common/base/base.entity';
import { Property } from '../../properties/entities/property.entity';
import { Unit } from '../../units/entities/unit.entity';
import { UtilityEwaBill } from './utility-ewa-bill.entity';

@Entity({ name: 'utility_ewa_accounts' })
export class UtilityEwaAccount extends AppBaseEntity {
  @Column({ name: 'property_id', type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property?: Property;

  @Column({ name: 'unit_id', type: 'uuid', nullable: true })
  unitId?: string | null;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'unit_id' })
  unit?: Unit | null;

  @Column({ name: 'unit_label', length: 120, nullable: true })
  unitLabel?: string | null;

  @Column({ name: 'ewa_account_no', length: 50 })
  ewaAccountNo: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @OneToMany(() => UtilityEwaBill, (b) => b.ewaAccount)
  bills?: UtilityEwaBill[];
}
