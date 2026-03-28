declare const SORT_FIELDS: readonly ["createdAt", "code", "name", "sortOrder"];
export declare class FindCatalogItemGroupsDto {
    page: number;
    limit: number;
    search?: string;
    sortBy: (typeof SORT_FIELDS)[number];
    sortDirection: 'ASC' | 'DESC';
}
export {};
