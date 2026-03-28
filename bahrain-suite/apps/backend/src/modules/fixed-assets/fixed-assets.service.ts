import { Injectable } from '@nestjs/common';

@Injectable()
export class FixedAssetsService {
  findAll() {
    return { module: 'fixed-assets', items: [] };
  }
}
