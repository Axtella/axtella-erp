import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class PlatformTenantModuleToggleDto {
  @IsString()
  @MaxLength(80)
  moduleCode: string;

  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsIn(['plan', 'manual', 'country_pack'])
  source?: 'plan' | 'manual' | 'country_pack';
}

export class SetPlatformTenantModulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatformTenantModuleToggleDto)
  modules: PlatformTenantModuleToggleDto[];
}
