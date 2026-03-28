import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  findAll() {
    return { module: 'rooms', items: [] };
  }
}
