import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertiesService {
  findAll() {
    return { module: 'properties', items: [] };
  }
}
