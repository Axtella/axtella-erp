import { Repository } from 'typeorm';
import { Investor } from './entities/investor.entity';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { FindInvestorsQueryDto } from './dto/find-investors-query.dto';
export declare class InvestorsService {
    private readonly repo;
    constructor(repo: Repository<Investor>);
    create(dto: CreateInvestorDto): Promise<Investor>;
    findAll(query: FindInvestorsQueryDto): Promise<{
        items: Investor[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Investor>;
    update(id: string, dto: UpdateInvestorDto): Promise<Investor>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
