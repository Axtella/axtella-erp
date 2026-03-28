import { Injectable } from '@nestjs/common';

@Injectable()
export class FoliosService {
  findAll() {
    return { module: 'folios', items: [] };
  }
}
