import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { CreateOperatingDaybookEntryDto } from './dto/create-operating-daybook-entry.dto';
import { FindOperatingDaybookDto } from './dto/find-operating-daybook.dto';
import { OperatingDaybookService } from './operating-daybook.service';

const LEDGER_ROLES = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.STAFF,
  UserRole.HR,
  UserRole.DEVELOPER,
] as const;

@ApiTags('operating-daybook')
@ApiBearerAuth('access-token')
@Controller('operating-daybook')
@Roles(...LEDGER_ROLES)
export class OperatingDaybookController {
  constructor(private readonly service: OperatingDaybookService) {}

  @Get()
  @ApiOperation({
    summary: 'Property operating daybook (cash-book style income / expense lines)',
  })
  findAll(@Query() query: FindOperatingDaybookDto) {
    return this.service.findAll(query);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ACCOUNTANT, UserRole.STAFF)
  @ApiOperation({ summary: 'Add a daybook line (voucher-style)' })
  create(@Body() dto: CreateOperatingDaybookEntryDto) {
    return this.service.create(dto);
  }
}
