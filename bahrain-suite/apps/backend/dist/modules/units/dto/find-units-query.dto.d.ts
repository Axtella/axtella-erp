export declare class FindUnitsQueryDto {
    page: number;
    limit: number;
    propertyId?: string;
    costCenterId?: string;
    unitTypeId?: string;
    status?: string;
    search?: string;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}
