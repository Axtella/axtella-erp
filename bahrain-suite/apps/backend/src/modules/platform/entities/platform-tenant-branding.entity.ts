import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'platform_tenant_branding' })
export class PlatformTenantBranding {
  @PrimaryColumn({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({ name: 'brand_name', length: 220, nullable: true })
  brandName?: string;

  @Column({ name: 'logo_light_url', type: 'text', nullable: true })
  logoLightUrl?: string;

  @Column({ name: 'logo_dark_url', type: 'text', nullable: true })
  logoDarkUrl?: string;

  @Column({ name: 'primary_color', length: 20, nullable: true })
  primaryColor?: string;

  @Column({ name: 'secondary_color', length: 20, nullable: true })
  secondaryColor?: string;

  @Column({ name: 'accent_color', length: 20, nullable: true })
  accentColor?: string;

  @Column({ name: 'email_from_name', length: 220, nullable: true })
  emailFromName?: string;

  @Column({ name: 'support_email', length: 220, nullable: true })
  supportEmail?: string;

  @Column({ name: 'support_phone', length: 60, nullable: true })
  supportPhone?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
