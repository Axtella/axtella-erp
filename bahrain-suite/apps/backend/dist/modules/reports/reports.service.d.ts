import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { AccountingService } from '../accounting/accounting.service';
export declare class ReportsService {
    private readonly propRepo;
    private readonly accounting;
    constructor(propRepo: Repository<Property>, accounting: AccountingService);
    private pdfToBuffer;
    buildPortfolioRegisterXlsx(): Promise<Buffer>;
    buildPortfolioRegisterPdf(): Promise<Buffer>;
    buildTrialBalancePdf(from: string, to: string, propertyId?: string): Promise<Buffer>;
}
