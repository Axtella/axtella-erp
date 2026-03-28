import { Injectable } from '@nestjs/common';

@Injectable()
export class JournalsService {
  findAll() {
    return { module: 'journals', items: [] };
  }
}
