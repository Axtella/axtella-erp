import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateHotelReservationDto {
  @IsString()
  customerId: string;

  @IsString()
  propertyId: string;

  @IsString()
  guestId: string;

  @IsOptional()
  @IsString()
  roomId?: string;

  @IsString()
  reservationNo: string;

  @IsString()
  arrivalDate: string;

  @IsString()
  departureDate: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  adults?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  children?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
