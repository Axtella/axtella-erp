import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAttendanceRecordDto {
  @ApiProperty({ example: 'EMP-001' })
  @IsString()
  @MaxLength(50)
  employeeCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  employeeName?: string;

  @ApiProperty({ example: '2026-03-26' })
  @IsDateString()
  workDate: string;

  @ApiPropertyOptional({ example: '09:00' })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  clockIn?: string;

  @ApiPropertyOptional({ example: '17:30' })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  clockOut?: string;

  @ApiPropertyOptional({ example: 'present' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
