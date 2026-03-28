import { PaginationQueryDto } from '../dto/pagination-query.dto';
export declare function normalizePagination(query: PaginationQueryDto): {
    page: number;
    limit: number;
};
export declare function pagedResult<T>(items: T[], total: number, page: number, limit: number): {
    items: T[];
    total: number;
    page: number;
    limit: number;
};
