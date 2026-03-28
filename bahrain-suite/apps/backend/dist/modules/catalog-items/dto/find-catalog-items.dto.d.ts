declare const SORT_FIELDS: readonly ["createdAt", "code", "name", "defaultPrice"];
export declare class FindCatalogItemsDto {
    page: number;
    limit: number;
    search?: string;
    sortBy: (typeof SORT_FIELDS)[number];
    sortOrder: 'ASC' | 'DESC';
}
export {};
