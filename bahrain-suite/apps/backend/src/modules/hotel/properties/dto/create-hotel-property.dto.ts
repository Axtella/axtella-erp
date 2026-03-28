import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateHotelPropertyDto {
  @IsString()
  customerId: string;

  @IsString()
  @MinLength(2)
  code: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
