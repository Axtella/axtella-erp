import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { CrmCoreService } from './crm-core.service';

@Controller('internal/scaffold/crm')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
export class CrmCoreController {
  constructor(private readonly service: CrmCoreService) {}

  @Get()
  getStatus() {
    return this.service.getScaffoldStatus();
  }
}
