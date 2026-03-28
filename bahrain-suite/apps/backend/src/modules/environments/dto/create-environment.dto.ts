import { IsOptional, IsString } from 'class-validator';

export class CreateEnvironmentDto {
  @IsString()
  customerId: string;

  @IsString()
  environmentKey: string;

  @IsString()
  environmentType: string;

  @IsOptional()
  @IsString()
  appUrl?: string;

  @IsOptional()
  @IsString()
  apiUrl?: string;

  @IsOptional()
  @IsString()
  deploymentStatus?: string;
}
