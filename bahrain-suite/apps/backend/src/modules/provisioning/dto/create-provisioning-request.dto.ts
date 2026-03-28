import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProvisioningRequestDto {
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  requestedBy?: string;

  @IsString()
  requestType: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  requestedConfigJson?: Record<string, unknown>;
}
