import { Injectable } from '@nestjs/common';

@Injectable()
export class PayablesAgingService {
  findAll() {
    return { module: 'payables-aging', items: [] };
  }
}
