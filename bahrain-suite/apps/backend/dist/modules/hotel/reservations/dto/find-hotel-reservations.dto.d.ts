import { PaginationQueryDto } from '../../../../common/dto/pagination-query.dto';
export declare class FindHotelReservationsDto extends PaginationQueryDto {
    roomId?: string;
    status?: string;
}
