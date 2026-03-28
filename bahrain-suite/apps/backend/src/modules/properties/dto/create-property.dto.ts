import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

function trimString({ value }: { value: unknown }) {
  return typeof value === 'string' ? value.trim() : value;
}

export class CreatePropertyDto {
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  code: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  propertyType: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  address: string;

  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  city: string;

  @IsOptional()
  @IsUUID()
  investorId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  ownerRentMonthly?: number;

  @IsDateString()
  operationStartDate: string;

  @IsOptional()
  @Transform(trimString)
  @IsString()
  status?: string;

  @IsOptional()
  @Transform(trimString)
  @IsString()
  notes?: string;

  @IsOptional()
  @Transform(trimString)
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'accentColor must be a hex color like #114a9f',
  })
  accentColor?: string;
}
