import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto/pagination-query.dto';

export class FindHotelHousekeepingTasksDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  status?: string;
}
