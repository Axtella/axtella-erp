export declare class FindPropertiesQueryDto {
    page?: number;
    limit?: number;
    investorId?: string;
    status?: string;
    propertyType?: string;
    search?: string;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}
