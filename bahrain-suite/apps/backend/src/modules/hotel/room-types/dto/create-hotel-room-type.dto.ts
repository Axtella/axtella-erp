import { IsBoolean, IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';

export class CreateHotelRoomTypeDto {
  @IsString()
  customerId: string;

  @IsString()
  propertyId: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsObject()
  nameI18n?: Record<string, string>;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxOccupancy?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
