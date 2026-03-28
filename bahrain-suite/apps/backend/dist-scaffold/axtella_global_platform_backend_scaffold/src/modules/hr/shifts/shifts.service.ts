import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftsService {
  findAll() {
    return { module: 'shifts', items: [] };
  }
}
