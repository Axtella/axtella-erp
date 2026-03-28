import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomTypesService {
  findAll() {
    return { module: 'room-types', items: [] };
  }
}
