import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { HrCoreService } from './hr-core.service';

@Controller('internal/scaffold/hr')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
export class HrCoreController {
  constructor(private readonly service: HrCoreService) {}

  @Get()
  getStatus() {
    return this.service.getScaffoldStatus();
  }
}
