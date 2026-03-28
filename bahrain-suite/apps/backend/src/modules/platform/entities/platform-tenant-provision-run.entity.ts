import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'platform_tenant_provision_runs' })
export class PlatformTenantProvisionRun {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({ name: 'run_status', length: 30, default: 'started' })
  runStatus: string;

  @Column({ name: 'dry_run', default: false })
  dryRun: boolean;

  @Column({ name: 'requested_modules', type: 'jsonb', default: () => "'[]'::jsonb" })
  requestedModules: unknown[];

  @Column({ name: 'result_summary', type: 'jsonb', default: () => "'{}'::jsonb" })
  resultSummary: Record<string, unknown>;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage?: string;

  @Column({ name: 'started_at', type: 'timestamptz', default: () => 'NOW()' })
  startedAt: Date;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt?: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;
}
