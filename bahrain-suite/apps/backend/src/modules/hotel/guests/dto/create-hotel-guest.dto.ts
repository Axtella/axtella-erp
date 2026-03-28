import { IsOptional, IsString } from 'class-validator';

export class CreateHotelGuestDto {
  @IsString()
  customerId: string;

  @IsString()
  guestNo: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
