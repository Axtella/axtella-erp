import { Repository } from 'typeorm';
import { CoaAccountHead } from './entities/coa-account-head.entity';
import { CreateCoaAccountHeadDto } from './dto/create-coa-account-head.dto';
import { UpdateCoaAccountHeadDto } from './dto/update-coa-account-head.dto';
import { FindCoaAccountHeadsDto } from './dto/find-coa-account-heads.dto';
export declare class CoaAccountHeadsService {
    private readonly repo;
    constructor(repo: Repository<CoaAccountHead>);
    create(dto: CreateCoaAccountHeadDto): Promise<CoaAccountHead>;
    findAll(query: FindCoaAccountHeadsDto): Promise<{
        items: CoaAccountHead[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<CoaAccountHead>;
    update(id: string, dto: UpdateCoaAccountHeadDto): Promise<CoaAccountHead>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
