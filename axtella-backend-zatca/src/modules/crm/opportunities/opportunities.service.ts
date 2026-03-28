import { Injectable } from '@nestjs/common';

@Injectable()
export class OpportunitiesService {
  findAll() {
    return { module: 'opportunities', items: [] };
  }
}
