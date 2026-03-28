import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  findAll() {
    return { module: 'contacts', items: [] };
  }
}
