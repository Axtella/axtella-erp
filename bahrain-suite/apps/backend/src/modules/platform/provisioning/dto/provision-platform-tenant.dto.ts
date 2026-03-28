import { IsArray, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProvisionPlatformTenantDto {
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;

  @IsOptional()
  @IsBoolean()
  seedDefaults?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(80, { each: true })
  includeModules?: string[];
}
