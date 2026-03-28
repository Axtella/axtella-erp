import { Injectable } from '@nestjs/common';

@Injectable()
export class MaintenanceService {
  findAll() {
    return { module: 'maintenance', items: [] };
  }
}
