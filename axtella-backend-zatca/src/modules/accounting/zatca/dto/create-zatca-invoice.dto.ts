import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ZatcaInvoiceLineDto {
  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  taxRate: number;
}

export class CreateZatcaInvoiceDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  invoiceType: 'standard' | 'simplified';

  @IsString()
  invoiceNumber: string;

  @IsString()
  issueDate: string;

  @IsString()
  issueTime: string;

  @IsString()
  sellerName: string;

  @IsString()
  sellerVatNumber: string;

  @IsOptional()
  @IsString()
  buyerName?: string;

  @IsOptional()
  @IsString()
  buyerVatNumber?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ZatcaInvoiceLineDto)
  lines: ZatcaInvoiceLineDto[];
}
