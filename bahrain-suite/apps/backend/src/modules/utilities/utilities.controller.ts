import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateEwaAccountDto } from './dto/create-ewa-account.dto';
import { CreateEwaBillDto } from './dto/create-ewa-bill.dto';
import { FindEwaAccountsDto } from './dto/find-ewa-accounts.dto';
import { FindEwaBillsDto } from './dto/find-ewa-bills.dto';
import { UtilitiesService } from './utilities.service';

const UTILITIES_READ_ROLES = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.STAFF,
  UserRole.HR,
  UserRole.DEVELOPER,
] as const;

@ApiTags('utilities')
@ApiBearerAuth('access-token')
@Controller('utilities')
@Roles(...UTILITIES_READ_ROLES)
export class UtilitiesController {
  constructor(private readonly service: UtilitiesService) {}

  @Get()
  @ApiOperation({
    summary: 'Utilities hub summary (EWA accounts and bills counts)',
  })
  overview(@Query('propertyId') propertyId?: string) {
    return this.service.overview(propertyId);
  }

  @Get('ewa/accounts')
  @ApiOperation({ summary: 'List EWA utility accounts by property' })
  listEwaAccounts(@Query() query: FindEwaAccountsDto) {
    return this.service.findEwaAccounts(query);
  }

  @Post('ewa/accounts')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.STAFF)
  @ApiOperation({ summary: 'Register an EWA account for a property / unit' })
  createEwaAccount(@Body() dto: CreateEwaAccountDto) {
    return this.service.createEwaAccount(dto);
  }

  @Get('ewa/bills')
  @ApiOperation({ summary: 'List EWA bills (with balances)' })
  listEwaBills(@Query() query: FindEwaBillsDto) {
    return this.service.findEwaBills(query);
  }

  @Post('ewa/bills')
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.STAFF)
  @ApiOperation({ summary: 'Record an EWA bill / payment line' })
  createEwaBill(@Body() dto: CreateEwaBillDto) {
    return this.service.createEwaBill(dto);
  }
}
