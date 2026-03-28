import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateZatcaOnboardingDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  environment: string;

  @IsOptional()
  @IsString()
  otp?: string;

  @IsOptional()
  @IsString()
  csrPem?: string;
}
