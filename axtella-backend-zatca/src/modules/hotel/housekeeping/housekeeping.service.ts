import { Injectable } from '@nestjs/common';

@Injectable()
export class HousekeepingService {
  findAll() {
    return { module: 'housekeeping', items: [] };
  }
}
