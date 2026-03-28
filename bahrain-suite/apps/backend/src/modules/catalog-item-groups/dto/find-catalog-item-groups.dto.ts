import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

const SORT_FIELDS = ['createdAt', 'code', 'name', 'sortOrder'] as const;

export class FindCatalogItemGroupsDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(200) limit = 50;
  @IsOptional() @IsString() search?: string;
  @IsOptional()
  @IsIn(SORT_FIELDS)
  sortBy: (typeof SORT_FIELDS)[number] = 'sortOrder';
  @IsOptional() @IsIn(['ASC', 'DESC']) sortDirection: 'ASC' | 'DESC' = 'ASC';
}
