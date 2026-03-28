import { CatalogItemsService } from './catalog-items.service';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
import { FindCatalogItemsDto } from './dto/find-catalog-items.dto';
export declare class CatalogItemsController {
    private readonly service;
    constructor(service: CatalogItemsService);
    create(dto: CreateCatalogItemDto): Promise<import("./entities/catalog-item.entity").CatalogItem>;
    findAll(query: FindCatalogItemsDto): Promise<{
        items: import("./entities/catalog-item.entity").CatalogItem[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        groupCode: string;
        groupName: string;
        code: string;
        name: string;
        itemType: string;
        unitOfMeasure: string;
        defaultPrice: number;
        isActive: boolean;
        notes?: string;
        groupId?: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCatalogItemDto): Promise<{
        groupCode: string;
        groupName: string;
        code: string;
        name: string;
        itemType: string;
        unitOfMeasure: string;
        defaultPrice: number;
        isActive: boolean;
        notes?: string;
        groupId?: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } & import("./entities/catalog-item.entity").CatalogItem>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
