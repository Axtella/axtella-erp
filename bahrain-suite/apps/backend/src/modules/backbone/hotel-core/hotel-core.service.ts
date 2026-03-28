import { Injectable } from '@nestjs/common';
import { ScaffoldStatus } from '../scaffold-status.type';

@Injectable()
export class HotelCoreService {
  getScaffoldStatus(): ScaffoldStatus {
    return {
      domain: 'hotel-core',
      phase: 2,
      ready: true,
      modules: [
        'properties',
        'room-types',
        'rooms',
        'rates',
        'reservations',
        'guests',
        'check-in-check-out',
        'housekeeping',
        'maintenance',
        'folios',
        'guest-billing',
        'occupancy-analytics',
      ],
      notes:
        'Advanced hospitality scaffolding is registered. Add domain entities and booking workflows next.',
    };
  }
}
