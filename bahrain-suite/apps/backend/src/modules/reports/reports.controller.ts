import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { FindTrialBalanceDto } from '../accounting/dto/find-trial-balance.dto';
import { ReportsService } from './reports.service';

const READ = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.HR,
  UserRole.DEVELOPER,
  UserRole.STAFF,
] as const;

@ApiTags('reports')
@ApiBearerAuth('access-token')
@Controller('reports')
@Roles(...READ)
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('portfolio/excel')
  @ApiOperation({ summary: 'Portfolio register — Excel template export' })
  @ApiProduces(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  async portfolioExcel() {
    const buf = await this.service.buildPortfolioRegisterXlsx();
    return new StreamableFile(buf, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename="axtella-portfolio-register.xlsx"',
    });
  }

  @Get('portfolio/pdf')
  @ApiOperation({ summary: 'Portfolio register — PDF report' })
  @ApiProduces('application/pdf')
  async portfolioPdf() {
    const buf = await this.service.buildPortfolioRegisterPdf();
    return new StreamableFile(buf, {
      type: 'application/pdf',
      disposition: 'attachment; filename="axtella-portfolio-register.pdf"',
    });
  }

  @Get('trial-balance/pdf')
  @ApiOperation({ summary: 'Trial balance — PDF (same basis as accounting TB)' })
  @ApiProduces('application/pdf')
  async trialBalancePdf(@Query() q: FindTrialBalanceDto) {
    const buf = await this.service.buildTrialBalancePdf(
      q.from,
      q.to,
      q.propertyId,
    );
    const name = `trial-balance-${q.from}_to_${q.to}.pdf`;
    return new StreamableFile(buf, {
      type: 'application/pdf',
      disposition: `attachment; filename="${name}"`,
    });
  }
}
