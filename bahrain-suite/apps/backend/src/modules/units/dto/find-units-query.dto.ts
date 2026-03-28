import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindUnitsQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit = 20;
  @IsOptional() @IsUUID() propertyId?: string;
  @IsOptional() @IsUUID() costCenterId?: string;
  @IsOptional() @IsUUID() unitTypeId?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() sortBy = 'createdAt';
  @IsOptional() @IsIn(['ASC','DESC']) sortOrder: 'ASC'|'DESC' = 'DESC';
}
