import { StreamableFile } from '@nestjs/common';
import { FindTrialBalanceDto } from '../accounting/dto/find-trial-balance.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly service;
    constructor(service: ReportsService);
    portfolioExcel(): Promise<StreamableFile>;
    portfolioPdf(): Promise<StreamableFile>;
    trialBalancePdf(q: FindTrialBalanceDto): Promise<StreamableFile>;
}
