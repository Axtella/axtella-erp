import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTenantSettingDto {
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  defaultLanguage?: string;

  @IsOptional()
  @IsArray()
  supportedLanguages?: string[];

  @IsOptional()
  @IsString()
  dateFormat?: string;

  @IsOptional()
  @IsString()
  timeFormat?: string;

  @IsOptional()
  @IsString()
  numberFormat?: string;
}
