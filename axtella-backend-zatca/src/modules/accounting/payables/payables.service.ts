import { Injectable } from '@nestjs/common';

@Injectable()
export class PayablesService {
  findAll() {
    return { module: 'payables', items: [] };
  }
}
