import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('crm/contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
