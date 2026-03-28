import { Injectable } from '@nestjs/common';

@Injectable()
export class ChartOfAccountsService {
  findAll() {
    return { module: 'chart-of-accounts', items: [] };
  }
}
