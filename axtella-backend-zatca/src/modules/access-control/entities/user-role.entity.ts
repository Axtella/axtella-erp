import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_roles' })
export class UserRoleEntity {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @Column({ name: 'assigned_by', type: 'uuid', nullable: true })
  assignedBy?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
