import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOperatingDaybookEntryDto {
  @IsUUID()
  propertyId: string;

  @IsOptional()
  @IsUUID()
  unitId?: string;

  @IsDateString()
  entryDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  voucherNo?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  accountCategory: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  paymentChannel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  bankAccountHint?: string;

  @IsOptional()
  debit?: number | string;

  @IsOptional()
  credit?: number | string;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  approvedBy?: string;

  @IsOptional()
  @IsDateString()
  approvalDate?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
