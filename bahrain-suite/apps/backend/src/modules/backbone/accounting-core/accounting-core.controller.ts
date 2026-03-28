import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { AccountingCoreService } from './accounting-core.service';

@Controller('internal/scaffold/accounting')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
export class AccountingCoreController {
  constructor(private readonly service: AccountingCoreService) {}

  @Get()
  getStatus() {
    return this.service.getScaffoldStatus();
  }
}
