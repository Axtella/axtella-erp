import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateFeatureFlagDto {
  @IsString()
  customerId: string;

  @IsString()
  moduleFeatureId: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsObject()
  configJson?: Record<string, unknown>;
}
