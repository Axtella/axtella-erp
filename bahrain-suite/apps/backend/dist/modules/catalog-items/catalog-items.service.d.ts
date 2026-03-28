import { Repository } from 'typeorm';
import { CatalogItem } from './entities/catalog-item.entity';
import { CreateCatalogItemDto } from './dto/create-catalog-item.dto';
import { UpdateCatalogItemDto } from './dto/update-catalog-item.dto';
import { FindCatalogItemsDto } from './dto/find-catalog-items.dto';
export declare class CatalogItemsService {
    private readonly repo;
    constructor(repo: Repository<CatalogItem>);
    create(dto: CreateCatalogItemDto): Promise<CatalogItem>;
    findAll(query: FindCatalogItemsDto): Promise<{
        items: CatalogItem[];
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
    } & CatalogItem>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
