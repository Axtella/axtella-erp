import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto/pagination-query.dto';

export class FindHotelRoomsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  propertyId?: string;
}
