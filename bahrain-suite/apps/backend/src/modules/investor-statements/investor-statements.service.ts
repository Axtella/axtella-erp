import { Injectable } from '@nestjs/common';

@Injectable()
export class InvestorStatementsService {
  findAll() {
    return { module: 'investor-statements', items: [] };
  }
}
