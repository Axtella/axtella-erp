import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdatePlatformTenantBrandingDto {
  @IsOptional()
  @IsString()
  @MaxLength(220)
  brandName?: string;

  @IsOptional()
  @IsUrl()
  logoLightUrl?: string;

  @IsOptional()
  @IsUrl()
  logoDarkUrl?: string;

  @IsOptional()
  @Matches(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/)
  primaryColor?: string;

  @IsOptional()
  @Matches(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/)
  secondaryColor?: string;

  @IsOptional()
  @Matches(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/)
  accentColor?: string;

  @IsOptional()
  @IsString()
  @MaxLength(220)
  emailFromName?: string;

  @IsOptional()
  @IsEmail()
  supportEmail?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  supportPhone?: string;
}
