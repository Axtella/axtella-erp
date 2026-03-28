import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantsService {
  findAll() {
    return { items: [], total: 0, page: 1, limit: 20 };
  }
}
