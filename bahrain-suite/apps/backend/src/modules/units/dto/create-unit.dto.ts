import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateUnitDto {
  @IsUUID() propertyId: string;
  @IsUUID() costCenterId: string;
  @IsUUID() unitTypeId: string;
  @IsString() @MaxLength(50) unitNo: string;
  @IsOptional() @IsNumber() areaSqM?: number;
  @IsOptional() @IsNumber() bedroomCount?: number;
  @IsOptional() @IsNumber() bathroomCount?: number;
  @IsOptional() @IsNumber() maxOccupancy?: number;
  @IsOptional() @IsString() @MaxLength(30) status?: string;
  @IsOptional() @IsNumber() defaultDailyRate?: number;
  @IsOptional() @IsNumber() defaultMonthlyRate?: number;
  @IsOptional() @IsString() notes?: string;
}
