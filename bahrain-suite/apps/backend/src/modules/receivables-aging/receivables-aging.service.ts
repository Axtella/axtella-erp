import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceivablesAgingService {
  findAll() {
    return { module: 'receivables-aging', items: [] };
  }
}
