import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateEwaAccountDto {
  @IsUUID()
  propertyId: string;

  @IsOptional()
  @IsUUID()
  unitId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  unitLabel?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  ewaAccountNo: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
