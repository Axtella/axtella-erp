import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsService {
  findAll() {
    return { module: 'reservations', items: [] };
  }
}
