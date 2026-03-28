import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotationsService {
  findAll() {
    return { module: 'quotations', items: [] };
  }
}
