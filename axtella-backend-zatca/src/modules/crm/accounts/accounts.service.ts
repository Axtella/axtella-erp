import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  findAll() {
    return { module: 'accounts', items: [] };
  }
}
