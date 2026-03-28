import { Injectable } from '@nestjs/common';

@Injectable()
export class VatService {
  findAll() {
    return { module: 'vat', items: [] };
  }
}
