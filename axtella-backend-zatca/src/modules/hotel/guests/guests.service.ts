import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestsService {
  findAll() {
    return { module: 'guests', items: [] };
  }
}
