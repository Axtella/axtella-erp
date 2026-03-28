import { Injectable } from '@nestjs/common';

@Injectable()
export class AmcService {
  findAll() {
    return { module: 'amc', items: [] };
  }
}
