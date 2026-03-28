import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @IsOptional() @IsDateString() actualCheckOutTime?: string;
  @IsOptional() @IsString() remarks?: string;
  @IsOptional() @IsNumber() extraCharges?: number;
}
