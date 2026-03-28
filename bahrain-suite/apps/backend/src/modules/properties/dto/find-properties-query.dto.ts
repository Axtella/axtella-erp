import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPropertiesQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number = 20;
  @IsOptional() @IsUUID() investorId?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() propertyType?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() sortBy = 'createdAt';
  @IsOptional() @IsIn(['ASC', 'DESC']) sortOrder: 'ASC' | 'DESC' = 'DESC';
}
