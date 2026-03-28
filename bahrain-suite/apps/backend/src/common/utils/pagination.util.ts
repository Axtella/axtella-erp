import { PaginationQueryDto } from '../dto/pagination-query.dto';

export function normalizePagination(query: PaginationQueryDto) {
  const page = Math.max(1, Number(query.page || 1));
  const limit = Math.max(1, Math.min(200, Number(query.limit || 20)));
  return { page, limit };
}

export function pagedResult<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
) {
  return { items, total, page, limit };
}
