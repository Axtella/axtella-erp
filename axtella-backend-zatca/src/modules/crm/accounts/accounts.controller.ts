import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('crm/accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
