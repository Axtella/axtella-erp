import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { PrivilegedPlatformService } from './privileged-platform.service';

@Controller('internal/scaffold/platform')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
export class PrivilegedPlatformController {
  constructor(private readonly service: PrivilegedPlatformService) {}

  @Get()
  getStatus() {
    return this.service.getScaffoldStatus();
  }
}
