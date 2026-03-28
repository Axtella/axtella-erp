import { CatalogItemGroupsService } from './catalog-item-groups.service';
import { CreateCatalogItemGroupDto } from './dto/create-catalog-item-group.dto';
import { UpdateCatalogItemGroupDto } from './dto/update-catalog-item-group.dto';
import { FindCatalogItemGroupsDto } from './dto/find-catalog-item-groups.dto';
export declare class CatalogItemGroupsController {
    private readonly service;
    constructor(service: CatalogItemGroupsService);
    create(dto: CreateCatalogItemGroupDto): Promise<import("./entities/catalog-item-group.entity").CatalogItemGroup>;
    findAll(query: FindCatalogItemGroupsDto): Promise<{
        items: import("./entities/catalog-item-group.entity").CatalogItemGroup[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/catalog-item-group.entity").CatalogItemGroup>;
    update(id: string, dto: UpdateCatalogItemGroupDto): Promise<import("./entities/catalog-item-group.entity").CatalogItemGroup>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
