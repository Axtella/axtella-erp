import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceivablesService {
  findAll() {
    return { module: 'receivables', items: [] };
  }
}
