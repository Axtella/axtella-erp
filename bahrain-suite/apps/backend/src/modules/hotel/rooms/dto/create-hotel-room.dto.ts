import { IsOptional, IsString } from 'class-validator';

export class CreateHotelRoomDto {
  @IsString()
  customerId: string;

  @IsString()
  propertyId: string;

  @IsString()
  roomTypeId: string;

  @IsString()
  roomNo: string;

  @IsOptional()
  @IsString()
  floorLabel?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
