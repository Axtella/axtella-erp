import { IsDateString, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindBookingsQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(200) limit?: number = 50;
  @IsOptional() @IsUUID() propertyId?: string;
  @IsOptional() @IsUUID() costCenterId?: string;
  @IsOptional() @IsUUID() unitId?: string;
  @IsOptional() @IsUUID() tenantId?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() bookingType?: string;
  @IsOptional() @IsDateString() fromDate?: string;
  @IsOptional() @IsDateString() toDate?: string;
}
