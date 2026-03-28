import { InvestorsService } from './investors.service';
import { CreateInvestorDto } from './dto/create-investor.dto';
import { UpdateInvestorDto } from './dto/update-investor.dto';
import { FindInvestorsQueryDto } from './dto/find-investors-query.dto';
export declare class InvestorsController {
    private readonly service;
    constructor(service: InvestorsService);
    create(dto: CreateInvestorDto): Promise<import("./entities/investor.entity").Investor>;
    findAll(query: FindInvestorsQueryDto): Promise<{
        items: import("./entities/investor.entity").Investor[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/investor.entity").Investor>;
    update(id: string, dto: UpdateInvestorDto): Promise<import("./entities/investor.entity").Investor>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
