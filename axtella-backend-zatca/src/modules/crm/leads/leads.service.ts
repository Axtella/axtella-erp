import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {
  findAll() {
    return { module: 'leads', items: [] };
  }
}
