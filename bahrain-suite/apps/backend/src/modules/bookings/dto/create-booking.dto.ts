import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateBookingDto {
  @IsUUID() propertyId: string;
  @IsUUID() costCenterId: string;
  @IsUUID() unitId: string;
  @IsUUID() tenantId: string;
  @IsString() @MaxLength(30) bookingType: string;
  @IsOptional() @IsString() @MaxLength(100) bookingSource?: string;
  @IsDateString() checkInDate: string;
  @IsOptional() @IsDateString() checkOutDate?: string;
  @IsOptional() @IsDateString() contractStartDate?: string;
  @IsOptional() @IsDateString() contractEndDate?: string;
  @IsOptional() @IsString() @MaxLength(30) status?: string;
  @IsOptional() @IsNumber() rateDaily?: number;
  @IsOptional() @IsNumber() rateMonthly?: number;
  @IsOptional() @IsNumber() depositAmount?: number;
  @IsOptional() @IsNumber() discountAmount?: number;
  @IsOptional() @IsString() notes?: string;
}
