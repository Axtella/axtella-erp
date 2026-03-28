import { Repository } from 'typeorm';
import { CatalogItemGroup } from './entities/catalog-item-group.entity';
import { CreateCatalogItemGroupDto } from './dto/create-catalog-item-group.dto';
import { UpdateCatalogItemGroupDto } from './dto/update-catalog-item-group.dto';
import { FindCatalogItemGroupsDto } from './dto/find-catalog-item-groups.dto';
export declare class CatalogItemGroupsService {
    private readonly repo;
    constructor(repo: Repository<CatalogItemGroup>);
    create(dto: CreateCatalogItemGroupDto): Promise<CatalogItemGroup>;
    findAll(query: FindCatalogItemGroupsDto): Promise<{
        items: CatalogItemGroup[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<CatalogItemGroup>;
    update(id: string, dto: UpdateCatalogItemGroupDto): Promise<CatalogItemGroup>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
