import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FindPropertiesDto } from './dto/find-properties.dto';
import { Investor } from '../investors/entities/investor.entity';
export declare class PropertiesService {
    private readonly repo;
    private readonly investorRepo;
    constructor(repo: Repository<Property>, investorRepo: Repository<Investor>);
    private ensureInvestor;
    create(dto: CreatePropertyDto): Promise<Property>;
    findAll(query: FindPropertiesDto): Promise<{
        items: Property[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Property>;
    update(id: string, dto: UpdatePropertyDto): Promise<Property>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    bulkImportFromCsv(csvText: string): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
}
