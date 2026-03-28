import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePlatformTenantDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(220)
  legalName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(220)
  displayName: string;

  @IsIn(['BH', 'SA', 'AE', 'GCC'])
  countryCode: 'BH' | 'SA' | 'AE' | 'GCC';

  @IsString()
  @MaxLength(10)
  currencyCode: string;

  @IsString()
  @MaxLength(80)
  timezone: string;

  @IsIn(['en', 'ar', 'bilingual'])
  defaultLanguage: 'en' | 'ar' | 'bilingual';

  @IsOptional()
  @IsString()
  @MaxLength(80)
  planCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  countryPackCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  compliancePackCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  roleTemplateCode?: string;
}
