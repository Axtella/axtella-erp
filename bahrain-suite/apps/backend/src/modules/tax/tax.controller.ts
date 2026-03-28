import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { vatFromGross, vatFromNet } from './bahrain-vat';

const ALL = [
  UserRole.ADMIN,
  UserRole.ACCOUNTANT,
  UserRole.HR,
  UserRole.DEVELOPER,
  UserRole.STAFF,
] as const;

@ApiTags('tax')
@ApiBearerAuth('access-token')
@Controller('tax')
@Roles(...ALL)
export class TaxController {
  @Get('bahrain-vat/from-net')
  @ApiOperation({ summary: 'Bahrain 10% VAT from net (exclusive) amount' })
  fromNet(@Query('amount') amount: string) {
    const n = Number(amount);
    if (amount === undefined || Number.isNaN(n)) {
      throw new BadRequestException('Query "amount" must be a number (net / tax-exclusive)');
    }
    return { jurisdiction: 'BH', ...vatFromNet(n) };
  }

  @Get('bahrain-vat/from-gross')
  @ApiOperation({ summary: 'Bahrain 10% VAT split from gross (inclusive) amount' })
  fromGross(@Query('amount') amount: string) {
    const n = Number(amount);
    if (amount === undefined || Number.isNaN(n)) {
      throw new BadRequestException('Query "amount" must be a number (gross / tax-inclusive)');
    }
    return { jurisdiction: 'BH', ...vatFromGross(n) };
  }
}
