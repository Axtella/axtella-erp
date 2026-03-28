import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEwaBillDto {
  @IsUUID()
  ewaAccountId: string;

  @IsOptional()
  @IsDateString()
  billPeriodFrom?: string;

  @IsOptional()
  @IsDateString()
  billPeriodTo?: string;

  @IsDateString()
  billDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  billNo?: string;

  @IsOptional()
  capAmount?: number | string;

  @IsOptional()
  @IsDateString()
  capDate?: string;

  @IsOptional()
  netAmount?: number | string;

  @IsOptional()
  vatAmount?: number | string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalBill: number;

  @IsOptional()
  @IsDateString()
  paymentDueDate?: string;

  @IsOptional()
  @IsDateString()
  paidDate?: string;

  @IsOptional()
  paidAmount?: number | string;

  @IsOptional()
  @IsString()
  notes?: string;
}
