import { IsDateString, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsString() @MaxLength(30) tenantType: string;
  @IsString() @MaxLength(200) fullName: string;
  @IsOptional() @IsString() @MaxLength(100) nationality?: string;
  @IsOptional() @IsString() @MaxLength(50) phone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MaxLength(100) cprNo?: string;
  @IsOptional() @IsString() @MaxLength(100) passportNo?: string;
  @IsOptional() @IsDateString() idExpiryDate?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() @MaxLength(200) companyName?: string;
  @IsOptional() @IsString() @MaxLength(200) emergencyContactName?: string;
  @IsOptional() @IsString() @MaxLength(50) emergencyContactPhone?: string;
  @IsOptional() @IsString() notes?: string;
}
