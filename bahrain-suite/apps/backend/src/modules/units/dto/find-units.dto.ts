import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindUnitsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number = 20;

  @IsOptional() @IsUUID() propertyId?: string;
  @IsOptional() @IsUUID() costCenterId?: string;
  @IsOptional() @IsUUID() unitTypeId?: string;

  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() search?: string;
}

