import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/user-role.enum';
import { HotelCoreService } from './hotel-core.service';

@Controller('internal/scaffold/hotel')
@Roles(UserRole.PLATFORM_SUPER_ADMIN)
export class HotelCoreController {
  constructor(private readonly service: HotelCoreService) {}

  @Get()
  getStatus() {
    return this.service.getScaffoldStatus();
  }
}
