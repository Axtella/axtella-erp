import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { AccountingService } from './accounting.service';
import { CoaAccountHeadsService } from './coa-account-heads.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { CreateCoaAccountHeadDto } from './dto/create-coa-account-head.dto';
import { UpdateCoaAccountHeadDto } from './dto/update-coa-account-head.dto';
import { FindCoaAccountHeadsDto } from './dto/find-coa-account-heads.dto';
import { FindJournalsDto } from './dto/find-journals.dto';
import { FindTrialBalanceDto } from './dto/find-trial-balance.dto';
import { parseIncomeChannelList } from './income-channels';

const FINANCE_READ_ROLES = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.HR,
  UserRole.DEVELOPER,
  UserRole.STAFF,
] as const;

@ApiTags('accounting')
@ApiBearerAuth('access-token')
@Controller('accounting')
@Roles(...FINANCE_READ_ROLES)
export class AccountingController {
  constructor(
    private readonly service: AccountingService,
    private readonly coaHeads: CoaAccountHeadsService,
  ) {}

  @Get('coa/account-heads')
  @ApiOperation({ summary: 'List chart of account heads (codes for journal posting)' })
  listCoaAccountHeads(@Query() query: FindCoaAccountHeadsDto) {
    return this.coaHeads.findAll(query);
  }

  @Post('coa/account-heads')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @ApiOperation({ summary: 'Create an account head in the chart of accounts' })
  createCoaAccountHead(@Body() dto: CreateCoaAccountHeadDto) {
    return this.coaHeads.create(dto);
  }

  @Patch('coa/account-heads/:id')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @ApiOperation({ summary: 'Update an account head' })
  updateCoaAccountHead(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCoaAccountHeadDto,
  ) {
    return this.coaHeads.update(id, dto);
  }

  @Delete('coa/account-heads/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove an account head (admin only)' })
  removeCoaAccountHead(@Param('id', ParseUUIDPipe) id: string) {
    return this.coaHeads.remove(id);
  }

  @Get('trial-balance')
  @ApiOperation({ summary: 'Trial balance by account for date range (posted journals)' })
  trialBalance(@Query() q: FindTrialBalanceDto) {
    return this.service.trialBalance(q.from, q.to, q.propertyId);
  }

  @Get('trial-balance/export')
  @ApiOperation({ summary: 'Trial balance as Excel (.xlsx)' })
  @ApiProduces(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  async trialBalanceExport(@Query() q: FindTrialBalanceDto) {
    const buf = await this.service.buildTrialBalanceXlsx(
      q.from,
      q.to,
      q.propertyId,
    );
    const name = `trial-balance-${q.from}_to_${q.to}.xlsx`;
    return new StreamableFile(buf, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: `attachment; filename="${name}"`,
    });
  }

  @Get('journals')
  @ApiOperation({ summary: 'List journal entries (optionally filter by property and date)' })
  journals(@Query() query: FindJournalsDto) {
    return this.service.findJournals(query);
  }

  @Get('journals/daybook')
  @ApiOperation({ summary: 'Daybook view: journals in chronological order for the filter' })
  daybook(@Query() query: FindJournalsDto) {
    return this.service.daybook(query);
  }

  @Get('journals/:id')
  @ApiOperation({ summary: 'Journal entry with lines' })
  journalById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findJournalById(id);
  }

  @Post('journals')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @ApiOperation({ summary: 'Post a balanced journal (double-entry)' })
  createJournal(@Body() dto: CreateJournalEntryDto) {
    return this.service.createJournal(dto);
  }

  @Get('income-expense')
  @ApiOperation({
    summary:
      'Income & expense statement; filter revenue by channels (comma: cash_receipt,pos,benefit_pay,untagged)',
  })
  incomeExpense(
    @Query('propertyId', ParseUUIDPipe) propertyId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('channels') channelsRaw?: string,
  ) {
    const channels = parseIncomeChannelList(channelsRaw);
    return this.service.incomeExpenseStatement(
      propertyId,
      month,
      year,
      channels,
    );
  }

  @Get('pnl/monthly')
  @ApiOperation({ summary: 'Monthly P&L from posted lines (COA mapping in code)' })
  monthlyPnl(
    @Query('propertyId', ParseUUIDPipe) propertyId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    return this.service.monthlyPnl(propertyId, month, year);
  }

  @Get('pnl/monthly/export')
  @ApiOperation({ summary: 'Download monthly P&L + journal lines as .xlsx' })
  @ApiProduces(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  async exportMonthlyPnl(
    @Query('propertyId', ParseUUIDPipe) propertyId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    const buf = await this.service.buildMonthlyPnlXlsx(propertyId, month, year);
    const name = `pnl-${propertyId.slice(0, 8)}-${year}-${String(month).padStart(2, '0')}.xlsx`;
    return new StreamableFile(buf, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: `attachment; filename="${name}"`,
    });
  }
}
