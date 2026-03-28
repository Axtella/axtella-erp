import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CheckinDto {
  @IsOptional() @IsDateString() actualCheckInTime?: string;
  @IsOptional() @IsString() remarks?: string;
}
