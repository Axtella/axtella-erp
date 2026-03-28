import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindTenantsQueryDto {
  @IsOptional() @IsString() tenantType?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() cprNo?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number = 20;
}
